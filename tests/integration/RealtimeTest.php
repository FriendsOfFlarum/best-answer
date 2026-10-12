<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Tests\integration;

use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\Realtime\Push\Jobs\SendTriggerJob;
use Flarum\Tags\Tag;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use Illuminate\Contracts\Queue\Queue;
use Illuminate\Queue\NullQueue;
use PHPUnit\Framework\Attributes\Test;

/**
 * Setting or removing a best answer is broadcast, so open lists and Deck columns can follow it.
 */
class RealtimeTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    /** @var array<int, object> */
    protected array $pushed = [];

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer', 'flarum-realtime');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
            ],
            Tag::class => [
                ['id' => 1, 'name' => 'Support', 'slug' => 'support', 'is_qna' => true],
            ],
            Discussion::class => [
                ['id' => 1, 'user_id' => 2, 'first_post_id' => 1, 'comment_count' => 2, 'last_post_number' => 2],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'user_id' => 2, 'number' => 1],
                ['id' => 2, 'discussion_id' => 1, 'user_id' => 1, 'number' => 2],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 1],
            ],
        ]);

        // Records jobs instead of running them, so nothing tries to reach a websocket server.
        $this->recordQueue();
    }

    protected function recordQueue(): void
    {
        $this->app()->getContainer()->instance(Queue::class, new class($this->pushed) extends NullQueue {
            /** @param array<int, object> $pushed */
            public function __construct(protected array &$pushed)
            {
            }

            public function push($job, $data = '', $queue = null)
            {
                $this->pushed[] = $job;

                return null;
            }
        });
    }

    protected function setBestAnswer(?int $postId): void
    {
        $response = $this->send(
            $this->request('PATCH', '/api/discussions/1', [
                'authenticatedAs' => 1,
                'json'            => ['data' => ['relationships' => ['bestAnswerPost' => ['data' => $postId ? ['type' => 'posts', 'id' => (string) $postId] : null]]]],
            ])
        );

        $this->assertEquals(200, $response->getStatusCode(), (string) $response->getBody());
    }

    /**
     * @return array<int, array{event: string, discussion: int, actor: ?int}>
     */
    protected function triggers(): array
    {
        $triggers = array_filter($this->pushed, fn (object $job) => $job instanceof SendTriggerJob);

        return array_values(array_map(fn (SendTriggerJob $job) => (fn () => [
            'event'      => $this->event,
            'discussion' => $this->model->id,
            'actor'      => $this->actor?->id,
        ])->call($job), $triggers));
    }

    #[Test]
    public function setting_a_best_answer_is_broadcast(): void
    {
        $this->setBestAnswer(2);

        $this->assertEquals([['event' => 'bestAnswerEvent', 'discussion' => 1, 'actor' => 1]], $this->triggers());
    }

    #[Test]
    public function removing_a_best_answer_is_broadcast(): void
    {
        $this->setBestAnswer(2);
        $this->pushed = [];

        $this->setBestAnswer(null);

        $this->assertEquals([['event' => 'bestAnswerEvent', 'discussion' => 1, 'actor' => 1]], $this->triggers());
    }
}
