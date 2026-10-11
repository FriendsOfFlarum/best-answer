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
use Flarum\Post\Post;
use Flarum\Tags\Tag;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
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
            User::class => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'normal2', 'email' => 'normal2@machine.local', 'is_email_confirmed' => 1, 'best_answer_count' => 0],
                ['id' => 4, 'username' => 'moderator', 'email' => 'moderator@machine.local', 'is_email_confirmed' => 1, 'best_answer_count' => 0],
            ],
            Tag::class => [
                ['id' => 2, 'name' => 'Q&A', 'slug' => 'q-a', 'description' => 'Q&A description', 'color' => '#FF0000', 'position' => 0, 'parent_id' => null, 'is_restricted' => false, 'is_hidden' => false, 'is_qna' => true],
            ],
            Discussion::class => [
                ['id' => 1, 'title' => __CLASS__, 'user_id' => 2, 'created_at' => Carbon::now(), 'comment_count' => 2],
                ['id' => 2, 'title' => 'Another discussion', 'user_id' => 3, 'created_at' => Carbon::now(), 'comment_count' => 1],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'user_id' => 2, 'type' => 'comment', 'content' => 'post 1 - question', 'created_at' => Carbon::now()],
                ['id' => 2, 'discussion_id' => 1, 'user_id' => 1, 'type' => 'comment', 'content' => 'post 2 - answer1', 'created_at' => Carbon::now()],
                ['id' => 3, 'discussion_id' => 1, 'user_id' => 3, 'type' => 'comment', 'content' => 'post 2 - answer2', 'created_at' => Carbon::now()],
                ['id' => 4, 'discussion_id' => 2, 'user_id' => 3, 'type' => 'comment', 'content' => 'question', 'created_at' => Carbon::now()],
                ['id' => 5, 'discussion_id' => 2, 'user_id' => 3, 'type' => 'comment', 'content' => 'answer', 'created_at' => Carbon::now()],
                ['id' => 6, 'discussion_id' => 2, 'user_id' => 4, 'type' => 'comment', 'content' => 'moderator answer', 'created_at' => Carbon::now()],
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

    public static function allowedUsersProvider(): array
    {
        return [
            [1],
            [2],
            [4],
        ];
    }

    public static function notAllowedUsersProvider(): array
    {
        return [
            [3],
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
                            'relationships' => [
                                'bestAnswerPost' => [
                                    'data' => [
                                        'type' => 'posts',
                                        'id'   => (string) $postId,
                                    ],
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
    #[DataProvider('allowedUsersProvider')]
    public function user_with_permission_can_set_best_answer(int $userId)
    {
        $response = $this->getDiscussion($userId);

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $attributes = $data['data']['attributes'];

        $this->assertFalse($attributes['hasBestAnswer'], 'Expected no best answer post ID');
        $this->assertTrue($attributes['canSelectBestAnswer'], 'Expected user to be able to set best answer');

        $response = $this->setBestAnswer($userId, 3);

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $attributes = $data['data']['attributes'];

        $this->assertEquals(3, $attributes['hasBestAnswer'], 'Expected best answer post ID to be 3');
    }

    #[Test]
    #[DataProvider('notAllowedUsersProvider')]
    public function user_without_permission_cannot_set_best_answer(int $userId)
    {
        $response = $this->getDiscussion($userId);

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $attributes = $data['data']['attributes'];

        $this->assertFalse($attributes['hasBestAnswer'], 'Expected no best answer post ID');
        $this->assertFalse($attributes['canSelectBestAnswer'], 'Expected user to not be able to set best answer');

        $response = $this->setBestAnswer($userId, 3);

        $this->assertEquals(403, $response->getStatusCode());
    }

    #[Test]
    public function user_cannot_set_own_post_as_best_answer_if_not_permitted()
    {
        // User 3 started discussion 2 and wrote post 5, but lacks allow_select_own_post.
        $response = $this->setBestAnswer(3, 5, 2);

        $this->assertEquals(403, $response->getStatusCode());
        $this->assertNull(Discussion::find(2)->best_answer_post_id);
    }

    #[Test]
    public function user_can_set_own_post_as_best_answer_if_permitted()
    {
        // User 4 wrote post 6 and holds allow_select_own_post.
        $response = $this->setBestAnswer(4, 6, 2);

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(6, $data['data']['attributes']['hasBestAnswer'], 'Expected best answer post ID to be 6');
    }

    public function getBestAnswerCount(int $userId): int
    {
        $response = $this->send(
            $this->request('GET', '/api/users/'.$userId, ['authenticatedAs' => 1])
        );

        $data = json_decode($response->getBody()->getContents(), true);

        return $data['data']['attributes']['bestAnswerCount'];
    }

    #[Test]
    public function replacing_best_answer_moves_count_from_previous_author_to_new_author()
    {
        $this->assertEquals(200, $this->setBestAnswer(1, 2)->getStatusCode());
        $this->assertEquals(200, $this->setBestAnswer(1, 3)->getStatusCode());

        $this->assertEquals(0, $this->getBestAnswerCount(1), 'Expected previous answer author to lose the count');
        $this->assertEquals(1, $this->getBestAnswerCount(3), 'Expected new answer author to gain the count');
    }
}
