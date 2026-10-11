<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Tests\integration\notification;

use Flarum\Discussion\Discussion;
use Flarum\Locale\LocaleManager;
use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\Notification\MailableInterface;
use Flarum\Notification\NotificationMailer;
use Flarum\Post\Post;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use FoF\BestAnswer\Notification\AwardedBestAnswerBlueprint;
use FoF\BestAnswer\Notification\BestAnswerSetInDiscussionBlueprint;
use FoF\BestAnswer\Notification\SelectBestAnswerBlueprint;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Mail\Events\MessageSent;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Symfony\Component\Mime\Email;

/**
 * Sends each best answer notification through core's notification mailer and
 * inspects the message as it went out, so the extension's views are rendered
 * inside core's email layout exactly as they are in production.
 */
class NotificationEmailTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        // User 2 asks, user 3 gives the best answer, user 4 also replies.
        $this->prepareDatabase([
            User::class => [
                ['id' => 2, 'username' => 'asker'],
                ['id' => 3, 'username' => 'answerer'],
                ['id' => 4, 'username' => 'participant'],
            ],
            Discussion::class => [
                ['id' => 1, 'title' => 'Tips & <tricks>', 'user_id' => 2],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'number' => 1, 'user_id' => 2],
                ['id' => 2, 'discussion_id' => 1, 'number' => 2, 'user_id' => 3],
                ['id' => 3, 'discussion_id' => 1, 'number' => 3, 'user_id' => 4],
            ],
        ]);
    }

    /**
     * @return array<string, array{string, int}>
     */
    public static function notifications(): array
    {
        return [
            'awarded best answer'           => [AwardedBestAnswerBlueprint::class, 3],
            'best answer set in discussion' => [BestAnswerSetInDiscussionBlueprint::class, 4],
            'select best answer'            => [SelectBestAnswerBlueprint::class, 2],
        ];
    }

    #[Test]
    #[DataProvider('notifications')]
    public function recipient_is_greeted_once(string $blueprintClass, int $recipientId)
    {
        $message = $this->sendEmail($blueprintClass, $recipientId);
        $greeting = 'Hey '.User::findOrFail($recipientId)->display_name.',';

        $this->assertSame(1, substr_count((string) $message->getHtmlBody(), $greeting), 'The HTML email must greet the recipient exactly once.');
        $this->assertSame(1, substr_count((string) $message->getTextBody(), $greeting), 'The plain text email must greet the recipient exactly once.');
    }

    #[Test]
    #[DataProvider('notifications')]
    public function html_email_has_no_empty_content_preview(string $blueprintClass, int $recipientId)
    {
        $html = (string) $this->sendEmail($blueprintClass, $recipientId)->getHtmlBody();

        $this->assertStringNotContainsString('class="content-preview"', $html);
    }

    #[Test]
    #[DataProvider('notifications')]
    public function html_email_body_is_formatted(string $blueprintClass, int $recipientId)
    {
        $body = $this->htmlMainContent($this->sendEmail($blueprintClass, $recipientId));

        // The body spans several lines; unformatted, a mail client collapses them into one paragraph.
        $this->assertMatchesRegularExpression('#<br\s*/?>#', $body, 'The body must keep its line breaks.');

        // Values put into the body are restored, and escaped rather than interpreted.
        $this->assertStringContainsString('http://localhost/d/1', $body);
        $this->assertStringContainsString('Tips &amp; &lt;tricks&gt;', $body);
        $this->assertStringNotContainsString('<tricks>', $body);
    }

    /**
     * @param class-string<BlueprintInterface&MailableInterface> $blueprintClass
     */
    protected function sendEmail(string $blueprintClass, int $recipientId): Email
    {
        $container = $this->app()->getContainer();

        // flarum/testing registers extension locales too late for them to load,
        // so add this extension's strings by hand to render the real email text.
        $container->make(LocaleManager::class)->addTranslations('en', __DIR__.'/../../../resources/locale/en.yml');

        $sent = null;
        $container->make(Dispatcher::class)->listen(MessageSent::class, function (MessageSent $event) use (&$sent) {
            $sent = $event->message;
        });

        $discussion = Discussion::findOrFail(1);

        $blueprint = match ($blueprintClass) {
            SelectBestAnswerBlueprint::class => new SelectBestAnswerBlueprint($discussion),
            default                          => new $blueprintClass($discussion, User::findOrFail(2)),
        };

        $container->make(NotificationMailer::class)->send($blueprint, User::findOrFail($recipientId));

        $this->assertInstanceOf(Email::class, $sent, 'The email was never sent.');
        $this->assertStringNotContainsString('fof-best-answer.email', (string) $sent->getHtmlBody(), 'The email text was not translated.');

        return $sent;
    }

    protected function htmlMainContent(Email $message): string
    {
        $this->assertMatchesRegularExpression('#<div class="main-content">(.*?)</div>#s', (string) $message->getHtmlBody());
        preg_match('#<div class="main-content">(.*?)</div>#s', (string) $message->getHtmlBody(), $matches);

        return $matches[1];
    }
}
