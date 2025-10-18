<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\tests\integration\api;

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\Tags\Tag;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Psr\Http\Message\ResponseInterface;

class UnsetBestAnswerTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags');
        $this->extension('fof-best-answer');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'normal2', 'email' => 'normal2@machine.local', 'is_email_confirmed' => 1, 'best_answer_count' => 0],
                ['id' => 4, 'username' => 'moderator', 'email' => 'mod:machine.local', 'is_email_confirmed' => 1],
            ],
            Tag::class => [
                ['id' => 2, 'name' => 'Q&A', 'slug' => 'q-a', 'description' => 'Q&A description', 'color' => '#FF0000', 'position' => 0, 'parent_id' => null, 'is_restricted' => false, 'is_hidden' => false, 'is_qna' => true],
            ],
            Discussion::class => [
                ['id' => 1, 'title' => __CLASS__, 'user_id' => 2, 'created_at' => Carbon::now(), 'comment_count' => 2, 'best_answer_post_id' => 2, 'best_answer_user_id' => 1, 'best_answer_set_at' => Carbon::now()],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'user_id' => 2, 'type' => 'comment', 'content' => 'post 1 - question', 'created_at' => Carbon::now()],
                ['id' => 2, 'discussion_id' => 1, 'user_id' => 1, 'type' => 'comment', 'content' => 'post 2 - answer1', 'created_at' => Carbon::now()],
                ['id' => 3, 'discussion_id' => 1, 'user_id' => 3, 'type' => 'comment', 'content' => 'post 2 - answer2', 'created_at' => Carbon::now()],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 2],
            ],
            'group_permission' => [
                ['permission' => 'discussion.selectBestAnswerOwnDiscussion', 'group_id' => 3],
                ['permission' => 'discussion.selectBestAnswerNotOwnDiscussion', 'group_id' => 4],
            ],
            'group_user' => [
                ['user_id' => 4, 'group_id' => 4],
            ],
        ]);
    }

    public function getBestAnswerDiscussion(int $userId = 2): ResponseInterface
    {
        return $this->send(
            $this->request(
                'GET',
                '/api/discussions/1',
                [
                    'authenticatedAs' => $userId,
                ]
            )
        );
    }

    public function setBestAnswerOnDiscussion(?int $userId, int $discussionId, ?int $postId): ResponseInterface
    {
        return $this->send(
            $this->request(
                'PATCH',
                '/api/discussions/'.$discussionId,
                [
                    'json' => [
                        'data' => [
                            'relationships' => [
                                'bestAnswerPost' => $postId ? [
                                    'data' => [
                                        'type' => 'posts',
                                        'id'   => (string) $postId,
                                    ],
                                ] : [
                                    'data' => null,
                                ],
                            ],
                        ],
                    ],
                    'authenticatedAs' => $userId,
                ]
            )
        );
    }

    #[Test]
    public function user_can_unset_best_answer_in_own_discussion_and_select_a_different_post()
    {
        // Check best answer is already present
        $response = $this->getBestAnswerDiscussion();

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $attributes = $data['data']['attributes'];
        $this->assertEquals(2, $attributes['hasBestAnswer'], 'Expected best answer post ID to be 2');

        // Unset best answer
        $response = $this->setBestAnswerOnDiscussion(2, 1, null);

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $attributes = $data['data']['attributes'];
        $this->assertFalse($attributes['hasBestAnswer']);

        // Check the best answer is unset and that we are allowed to set a new one
        $response = $this->getBestAnswerDiscussion();

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $attributes = $data['data']['attributes'];
        $this->assertFalse($attributes['hasBestAnswer']);
        $this->assertTrue($attributes['canSelectBestAnswer'], 'Expected user to be able to set a best answer');

        // Set a different post as best answer
        $response = $this->setBestAnswerOnDiscussion(2, 1, 3);

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $attributes = $data['data']['attributes'];
        $this->assertEquals(3, $attributes['hasBestAnswer'], 'Expected best answer post ID to be 3');
    }

    public static function noPermissionUserProvider(): array
    {
        return [
            [3],
        ];
    }

    public static function withPermissionUserProvider(): array
    {
        return [
            [2],
            [4],
        ];
    }

    #[Test]
    #[DataProvider('noPermissionUserProvider')]
    public function user_without_permission_cannot_unset_a_best_answer(int $userId)
    {
        $response = $this->setBestAnswerOnDiscussion($userId, 1, null);

        $this->assertEquals(403, $response->getStatusCode());
    }

    #[Test]
    #[DataProvider('withPermissionUserProvider')]
    public function user_with_permission_can_unset_a_best_answer(int $userId)
    {
        $response = $this->setBestAnswerOnDiscussion($userId, 1, null);

        $this->assertEquals(200, $response->getStatusCode());
    }
}
