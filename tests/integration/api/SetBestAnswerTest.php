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
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Psr\Http\Message\ResponseInterface;

class SetBestAnswerTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags');
        $this->extension('fof-best-answer');

        $this->prepareDatabase([
            'users' => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'normal2', 'email' => 'normal2@machine.local', 'is_email_confirmed' => 1, 'best_answer_count' => 0],
                ['id' => 4, 'username' => 'moderator', 'email' => 'moderator@machine.local', 'is_email_confirmed' => 1, 'best_answer_count' => 0],
            ],
            'tags' => [
                ['id' => 2, 'name' => 'Q&A', 'slug' => 'q-a', 'description' => 'Q&A description', 'color' => '#FF0000', 'position' => 0, 'parent_id' => null, 'is_restricted' => false, 'is_hidden' => false, 'is_qna' => true],
            ],
            'discussions' => [
                ['id' => 1, 'title' => __CLASS__, 'user_id' => 2, 'created_at' => Carbon::now(), 'comment_count' => 2],
                ['id' => 2, 'title' => 'Another discussion', 'user_id' => 3, 'created_at' => Carbon::now(), 'comment_count' => 1],
            ],
            'posts' => [
                ['id' => 1, 'discussion_id' => 1, 'user_id' => 2, 'type' => 'comment', 'content' => 'post 1 - question', 'created_at' => Carbon::now()],
                ['id' => 2, 'discussion_id' => 1, 'user_id' => 1, 'type' => 'comment', 'content' => 'post 2 - answer1', 'created_at' => Carbon::now()],
                ['id' => 3, 'discussion_id' => 1, 'user_id' => 3, 'type' => 'comment', 'content' => 'post 2 - answer2', 'created_at' => Carbon::now()],
                ['id' => 4, 'discussion_id' => 2, 'user_id' => 3, 'type' => 'comment', 'content' => 'question', 'created_at' => Carbon::now()],
                ['id' => 5, 'discussion_id' => 2, 'user_id' => 3, 'type' => 'comment', 'content' => 'answer', 'created_at' => Carbon::now()],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 2],
                ['discussion_id' => 2, 'tag_id' => 2],
            ],
            'group_permission' => [
                ['group_id' => 4, 'permission' => 'discussion.selectBestAnswerNotOwnDiscussion', 'created_at' => Carbon::now()],
                ['group_id' => 4, 'permission' => 'discussion.fof-best-answer.allow_select_own_post', 'created_at' => Carbon::now()],
            ],
            'group_user' => [
                ['user_id' => 4, 'group_id' => 4],
            ],
        ]);
    }

    public function allowedUsersProvider(): array
    {
        return [
            [1],
            [2],
            [4],
        ];
    }

    public function notAllowedUsersProvider(): array
    {
        return [
            [3],
        ];
    }

    public static function unauthorizedUsersOwnPostProvider(): array
    {
        return [
            [2],
            [3],
        ];
    }

    public static function permittedUsersOwnPostProvider(): array
    {
        return [
            [1],
            [4],
        ];
    }

    public function getDiscussion(int $userId): ResponseInterface
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

    public function setBestAnswer(int $userId, int $postId, int $discussionId = 1): ResponseInterface
    {
        return $this->send(
            $this->request(
                'PATCH',
                '/api/discussions/'.$discussionId,
                [
                    'json' => [
                        'data' => [
                            'attributes' => [
                                'bestAnswerPostId' => $postId,
                            ],
                        ],
                    ],
                    'authenticatedAs' => $userId,
                ]
            )
        );
    }

    /**
     * @test
     *
     * @dataProvider allowedUsersProvider
     */
    public function user_with_permission_can_set_best_answer(int $userId)
    {
        $response = $this->getDiscussion($userId);

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $attributes = $data['data']['attributes'];

        $this->assertFalse($attributes['hasBestAnswer'], 'Expected no best answer post ID');

        $response = $this->setBestAnswer($userId, 3);

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $attributes = $data['data']['attributes'];

        $this->assertEquals(3, $attributes['hasBestAnswer'], 'Expected best answer post ID to be 3');
    }

    /**
     * @test
     *
     * @dataProvider notAllowedUsersProvider
     */
    public function user_without_permission_cannot_set_best_answer(int $userId)
    {
        $response = $this->getDiscussion($userId);

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $attributes = $data['data']['attributes'];

        $this->assertFalse($attributes['hasBestAnswer'], 'Expected no best answer post ID');

        $response = $this->setBestAnswer($userId, 3);

        $this->assertEquals(403, $response->getStatusCode());
    }

    /**
     * @test
     *
     * @dataProvider unauthorizedUsersOwnPostProvider
     */
    public function user_cannot_set_own_post_as_best_answer_if_not_permitted(int $userId)
    {
        $response = $this->setBestAnswer($userId, 5, 2);

        $this->assertEquals(403, $response->getStatusCode());
    }

    /**
     * @test
     *
     * @dataProvider permittedUsersOwnPostProvider
     */
    public function user_can_set_own_post_as_best_answer_if_permitted(int $userId)
    {
        $response = $this->setBestAnswer($userId, 5, 2);

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $attributes = $data['data']['attributes'];

        $this->assertEquals(5, $attributes['hasBestAnswer'], 'Expected best answer post ID to be 5');
    }
}
