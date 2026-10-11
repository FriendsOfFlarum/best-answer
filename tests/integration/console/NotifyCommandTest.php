<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Tests\integration\console;

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\Tags\Tag;
use Flarum\Testing\integration\ConsoleTestCase;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

class NotifyCommandTest extends ConsoleTestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        $this->setting('fof-best-answer.select_best_answer_reminder_days', 1);

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'answerer', 'email' => 'answerer@machine.local', 'is_email_confirmed' => 1],
            ],
            Tag::class => [
                ['id' => 1, 'name' => 'Q&A', 'slug' => 'q-a', 'description' => '', 'color' => '#FF0000', 'position' => 0, 'parent_id' => null, 'is_restricted' => false, 'is_hidden' => false, 'is_qna' => true, 'qna_reminders' => true],
            ],
            // NULL as stored for discussions started between the 2025_10_17 migration and the model default.
            Discussion::class => [
                ['id' => 1, 'title' => __CLASS__, 'user_id' => 2, 'created_at' => Carbon::now()->subDays(2), 'comment_count' => 2, 'is_private' => false, 'best_answer_notified' => null],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'user_id' => 2, 'type' => 'comment', 'content' => 'question', 'created_at' => Carbon::now()->subDays(2)],
                ['id' => 2, 'discussion_id' => 1, 'user_id' => 3, 'type' => 'comment', 'content' => 'answer', 'created_at' => Carbon::now()->subDays(2)],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 1],
            ],
        ]);
    }

    protected function reminderSentTo(int $userId): bool
    {
        return $this->database()->table('notifications')
            ->where('type', 'selectBestAnswer')
            ->where('user_id', $userId)
            ->where('subject_id', 1)
            ->exists();
    }

    #[Test]
    public function reminds_author_when_notified_flag_is_null()
    {
        $this->runCommand(['command' => 'fof:best-answer:notify']);

        $this->assertTrue($this->reminderSentTo(2));
    }

    #[Test]
    public function reminds_author_again_after_best_answer_is_removed()
    {
        $this->app();
        $this->database()->table('discussions')->where('id', 1)->update([
            'best_answer_post_id'  => 2,
            'best_answer_user_id'  => 2,
            'best_answer_notified' => true,
        ]);

        $response = $this->send(
            $this->request('PATCH', '/api/discussions/1', [
                'json' => [
                    'data' => [
                        'relationships' => [
                            'bestAnswerPost' => ['data' => null],
                        ],
                    ],
                ],
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $this->runCommand(['command' => 'fof:best-answer:notify']);

        $this->assertTrue($this->reminderSentTo(2));
    }
}
