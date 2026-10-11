<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Tests\integration\api;

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\Extend;
use Flarum\Foundation\ValidationException;
use Flarum\Post\Post;
use Flarum\Tags\Tag;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

class BestAnswerReminderKeptOnFailedUpdateTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 3],
            ],
            Tag::class => [
                ['id' => 1, 'is_qna' => true],
            ],
            Discussion::class => [
                ['id' => 1, 'user_id' => 2, 'comment_count' => 2],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'number' => 1, 'user_id' => 2],
                ['id' => 2, 'discussion_id' => 1, 'number' => 2, 'user_id' => 3],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 1],
            ],
            'notifications' => [
                ['id' => 1, 'user_id' => 2, 'from_user_id' => 2, 'type' => 'selectBestAnswer', 'subject_id' => 1, 'created_at' => Carbon::now()],
            ],
        ]);
    }

    protected function selectBestAnswer(): int
    {
        $response = $this->send(
            $this->request('PATCH', '/api/discussions/1', [
                'json' => [
                    'data' => [
                        'relationships' => [
                            'bestAnswerPost' => ['data' => ['type' => 'posts', 'id' => '2']],
                        ],
                    ],
                ],
                'authenticatedAs' => 2,
            ])
        );

        return $response->getStatusCode();
    }

    protected function reminderIsPending(): bool
    {
        return $this->database()->table('notifications')->where('id', 1)->where('is_deleted', false)->exists();
    }

    #[Test]
    public function reminder_is_kept_when_the_discussion_fails_to_save()
    {
        // Fields are validated before any setter runs, so the failure has to come after the setters: while saving.
        $this->extend(
            (new Extend\Event())->listen(Saving::class, function () {
                throw new ValidationException(['title' => 'Rejected while saving.']);
            })
        );

        $this->assertEquals(422, $this->selectBestAnswer());
        $this->assertTrue($this->reminderIsPending());
    }
}
