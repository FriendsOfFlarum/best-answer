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
use Flarum\Notification\NotificationSyncer;
use Flarum\Post\Post;
use Flarum\Tags\Tag;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use FoF\BestAnswer\Jobs\SendNotificationWhenBestAnswerSetInDiscussion;
use PHPUnit\Framework\Attributes\Test;

class BestAnswerNotificationsTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        // User 2 asks, user 3 answers, user 4 also replies, user 5 never takes part.
        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 3],
                ['id' => 4],
                ['id' => 5],
            ],
            Tag::class => [
                ['id' => 1, 'is_qna' => true],
            ],
            Discussion::class => [
                ['id' => 1, 'user_id' => 2, 'comment_count' => 3],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'number' => 1, 'user_id' => 2],
                ['id' => 2, 'discussion_id' => 1, 'number' => 2, 'user_id' => 3],
                ['id' => 3, 'discussion_id' => 1, 'number' => 3, 'user_id' => 4],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 1],
            ],
            'notifications' => [
                ['id' => 1, 'user_id' => 2, 'from_user_id' => null, 'type' => 'selectBestAnswer', 'subject_id' => 1, 'created_at' => Carbon::now()],
            ],
        ]);
    }

    protected function selectBestAnswer(?string $postId = '2', int $actorId = 2): void
    {
        $response = $this->send(
            $this->request('PATCH', '/api/discussions/1', [
                'json' => [
                    'data' => [
                        'relationships' => [
                            'bestAnswerPost' => ['data' => $postId ? ['type' => 'posts', 'id' => $postId] : null],
                        ],
                    ],
                ],
                'authenticatedAs' => $actorId,
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());
    }

    /**
     * @return int[]
     */
    protected function recipientsOf(string $type): array
    {
        return $this->database()->table('notifications')
            ->where('type', $type)
            ->where('subject_id', 1)
            ->where('is_deleted', false)
            ->orderBy('user_id')
            ->pluck('user_id')
            ->map(fn ($id) => (int) $id)
            ->all();
    }

    #[Test]
    public function answer_author_is_told_their_post_was_chosen()
    {
        $this->selectBestAnswer();

        $this->assertSame([3], $this->recipientsOf('awardedBestAnswer'));
    }

    #[Test]
    public function other_participants_are_told_a_best_answer_was_set()
    {
        $this->selectBestAnswer();

        $this->assertSame([4], $this->recipientsOf('bestAnswerInDiscussion'));
    }

    #[Test]
    public function reminder_to_choose_a_best_answer_is_removed()
    {
        $this->selectBestAnswer();

        $this->assertSame([], $this->recipientsOf('selectBestAnswer'));
    }

    #[Test]
    public function both_notifications_are_withdrawn_when_the_best_answer_is_removed()
    {
        $this->selectBestAnswer('2');
        $this->selectBestAnswer(null);

        $this->assertSame([], $this->recipientsOf('awardedBestAnswer'));
        $this->assertSame([], $this->recipientsOf('bestAnswerInDiscussion'));
    }

    #[Test]
    public function replacing_the_best_answer_only_leaves_notifications_about_the_new_one()
    {
        // A moderator replacing the asker's choice: different actors mean different notification blueprints.
        $this->selectBestAnswer('2');
        $this->selectBestAnswer('3', actorId: 1);

        $this->assertSame([4], $this->recipientsOf('awardedBestAnswer'));
        $this->assertSame([2, 3], $this->recipientsOf('bestAnswerInDiscussion'));
    }

    #[Test]
    public function a_job_for_an_answer_that_has_since_been_replaced_sends_nothing()
    {
        $this->app();
        $this->database()->table('discussions')->where('id', 1)->update(['best_answer_post_id' => 3, 'best_answer_user_id' => 2]);

        // Queued when post 2 was chosen, but post 3 had replaced it by the time it ran.
        $job = new SendNotificationWhenBestAnswerSetInDiscussion(Discussion::find(1), User::find(2), 2);
        $job->handle($this->app()->getContainer()->make(NotificationSyncer::class));

        $this->assertSame([], $this->recipientsOf('awardedBestAnswer'));
        $this->assertSame([], $this->recipientsOf('bestAnswerInDiscussion'));
    }
}
