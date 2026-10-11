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

use Carbon\Carbon;
use Flarum\Audit\AuditLog;
use Flarum\Audit\AuditLogger;
use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\Tags\Tag;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

class AuditTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        AuditLogger::$testMode = true;

        $this->extension('flarum-tags', 'fof-best-answer', 'flarum-audit');

        $this->prepareDatabase([
            'audit_log' => [],
            User::class => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'answerer', 'email' => 'answerer@machine.local', 'is_email_confirmed' => 1],
            ],
            Tag::class => [
                ['id' => 1, 'name' => 'Q&A', 'slug' => 'q-a', 'description' => '', 'color' => '#FF0000', 'position' => 0, 'parent_id' => null, 'is_restricted' => false, 'is_hidden' => false, 'is_qna' => true],
            ],
            Discussion::class => [
                ['id' => 1, 'title' => __CLASS__, 'user_id' => 2, 'created_at' => Carbon::now(), 'comment_count' => 3],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'user_id' => 2, 'type' => 'comment', 'content' => 'question', 'created_at' => Carbon::now()],
                ['id' => 2, 'discussion_id' => 1, 'user_id' => 1, 'type' => 'comment', 'content' => 'answer', 'created_at' => Carbon::now()],
                ['id' => 3, 'discussion_id' => 1, 'user_id' => 3, 'type' => 'comment', 'content' => 'better answer', 'created_at' => Carbon::now()],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 1],
            ],
        ]);
    }

    private function setBestAnswer(int $postId): void
    {
        $response = $this->send(
            $this->request('PATCH', '/api/discussions/1', [
                'json' => [
                    'data' => [
                        'relationships' => [
                            'bestAnswerPost' => [
                                'data' => ['type' => 'posts', 'id' => (string) $postId],
                            ],
                        ],
                    ],
                ],
                'authenticatedAs' => 1,
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());
    }

    private function unsetBestAnswer(): void
    {
        $response = $this->send(
            $this->request('PATCH', '/api/discussions/1', [
                'json' => [
                    'data' => [
                        'relationships' => [
                            'bestAnswerPost' => [
                                'data' => null,
                            ],
                        ],
                    ],
                ],
                'authenticatedAs' => 1,
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());
    }

    #[Test]
    public function setting_best_answer_logs_audit_entry()
    {
        $this->setBestAnswer(2);

        $log = AuditLog::query()->where('action', 'discussion.best_answer_set')->first();

        $this->assertNotNull($log);
        $this->assertEquals(1, $log->actor_id);
        $this->assertEquals([
            'discussion_id' => 1,
            'post_id'       => 2,
        ], $log->payload);
    }

    #[Test]
    public function unsetting_best_answer_logs_audit_entry()
    {
        $this->setBestAnswer(2);
        $this->unsetBestAnswer();

        $log = AuditLog::query()->where('action', 'discussion.best_answer_unset')->first();

        $this->assertNotNull($log);
        $this->assertEquals(1, $log->actor_id);
        $this->assertEquals([
            'discussion_id' => 1,
            'post_id'       => 2,
        ], $log->payload);

        $this->assertEquals(2, AuditLog::query()->count());
    }

    #[Test]
    public function replacing_best_answer_logs_unset_for_previous_then_set_for_new()
    {
        $this->setBestAnswer(2);
        $this->setBestAnswer(3);

        $logs = AuditLog::query()->orderBy('id')->get(['action', 'payload']);

        $this->assertEquals([
            ['action' => 'discussion.best_answer_set', 'payload' => ['discussion_id' => 1, 'post_id' => 2]],
            ['action' => 'discussion.best_answer_unset', 'payload' => ['discussion_id' => 1, 'post_id' => 2]],
            ['action' => 'discussion.best_answer_set', 'payload' => ['discussion_id' => 1, 'post_id' => 3]],
        ], $logs->map(fn (AuditLog $log) => ['action' => $log->action, 'payload' => $log->payload])->all());
    }
}
