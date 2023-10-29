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
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;

class BestAnswerTest extends TestCase
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
                ['id' => 3, 'username' => 'normal2', 'email' => 'normal2@machine.local', 'best_answer_count' => 1],
            ],
            'discussions' => [
                ['id' => 1, 'title' => __CLASS__, 'user_id' => 1, 'created_at' => Carbon::now(), 'comment_count' => 2, 'best_answer_post_id' => null],
                ['id' => 2, 'title' => __CLASS__, 'user_id' => 1, 'created_at' => Carbon::now(), 'comment_count' => 2, 'best_answer_post_id' => 4, 'best_answer_user_id' => 1, 'best_answer_set_at' => Carbon::now()],
                ['id' => 3, 'title' => __CLASS__, 'user_id' => 1, 'created_at' => Carbon::now(), 'comment_count' => 2, 'best_answer_post_id' => 6, 'best_answer_user_id' => 1, 'best_answer_set_at' => Carbon::now()],
            ],
            'posts' => [
                ['id' => 1, 'discussion_id' => 1, 'user_id' => 1, 'type' => 'comment', 'content' => 'post 1', 'created_at' => Carbon::now()],
                ['id' => 2, 'discussion_id' => 1, 'user_id' => 2, 'type' => 'comment', 'content' => 'post 2', 'created_at' => Carbon::now()],
                ['id' => 3, 'discussion_id' => 2, 'user_id' => 2, 'type' => 'comment', 'content' => 'post 1', 'created_at' => Carbon::now()],
                ['id' => 4, 'discussion_id' => 2, 'user_id' => 1, 'type' => 'comment', 'content' => 'post 2', 'created_at' => Carbon::now()],
                ['id' => 5, 'discussion_id' => 3, 'user_id' => 2, 'type' => 'comment', 'content' => 'post 1', 'created_at' => Carbon::now()],
                ['id' => 6, 'discussion_id' => 3, 'user_id' => 3, 'type' => 'comment', 'content' => 'post 2', 'created_at' => Carbon::now()],

            ],
            'tags' => [
                ['id' => 1, 'name' => 'Tag 1', 'slug' => 'tag-1', 'description' => 'Tag 1 description', 'color' => '#FF0000', 'position' => 0, 'parent_id' => null, 'is_restricted' => false, 'is_hidden' => false, 'is_qna' => true],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 1],
                ['discussion_id' => 2, 'tag_id' => 1],
            ],
        ]);
    }

    /**
     * @test
     */
    public function default_answer_count_for_new_user_is_zero()
    {
        $response = $this->send(
            $this->request(
                'GET',
                '/api/users/2',
                [
                    'authenticatedAs' => '1',
                ],
            )
        );

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(0, $data['data']['attributes']['bestAnswerCount']);
    }

    /**
     * @test
     */
    public function user_with_extising_best_answer_has_correct_count()
    {
        $response = $this->send(
            $this->request(
                'GET',
                '/api/users/1',
                [
                    'authenticatedAs' => '2',
                ],
            )
        );

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(1, $data['data']['attributes']['bestAnswerCount']);
    }

    /**
     * @test
     */
    public function setting_best_answer_increases_author_best_answer_count()
    {
        $response = $this->send(
            $this->request(
                'PATCH',
                '/api/discussions/1',
                [
                    'json' => [
                        'data' => [
                            'attributes' => [
                                'bestAnswerPostId' => 2,
                                'bestAnswerUserId' => 1,
                            ],
                        ],

                    ],
                    'authenticatedAs' => '1',
                ],
            )
        );

        $this->assertEquals(200, $response->getStatusCode());

        $discussion = Discussion::find(1);

        $this->assertEquals(2, $discussion->best_answer_post_id);

        $answerAuthor = User::find(2);

        $this->assertEquals(1, $answerAuthor->best_answer_count);
    }

    /**
     * @test
     */
    public function unsetting_best_answer_decreases_author_best_answer_count()
    {
        $response = $this->send(
            $this->request(
                'PATCH',
                '/api/discussions/2',
                [
                    'json' => [
                        'data' => [
                            'attributes' => [
                                'bestAnswerPostId' => 0,
                            ],
                        ],

                    ],
                    'authenticatedAs' => '1',
                ],
            )
        );

        $this->assertEquals(200, $response->getStatusCode());

        $discussion = Discussion::find(2);

        $this->assertNull($discussion->best_answer_post_id);

        $answerAuthor = User::find(1);

        $this->assertEquals(0, $answerAuthor->best_answer_count);
    }

    /**
     * @test
     */
    public function deleting_the_best_answer_post_in_a_discussion_reduces_author_best_answer_count()
    {
        $response = $this->send(
            $this->request(
                'DELETE',
                '/api/posts/6',
                [
                    'authenticatedAs' => '1',
                    'json'            => [],
                ],
            )
        );

        $this->assertEquals(204, $response->getStatusCode());

        $discussion = Discussion::find(3);

        $this->assertNull($discussion->best_answer_post_id);

        $post = Post::find(6);

        $this->assertNull($post);

        $answerAuthor = User::find(3);

        $this->assertEquals(0, $answerAuthor->best_answer_count);
    }

    /**
     * @test
     */
    public function deleting_a_discussion_with_a_best_answer_reduces_author_best_answer_count()
    {
        $response = $this->send(
            $this->request(
                'DELETE',
                '/api/discussions/3',
                [
                    'authenticatedAs' => '1',
                    'json'            => [],
                ],
            )
        );

        $this->assertEquals(204, $response->getStatusCode());

        $discussion = Discussion::find(3);

        $this->assertNull($discussion);

        $post = Post::find(6);

        $this->assertNull($post);

        $answerAuthor = User::find(3);

        $this->assertEquals(0, $answerAuthor->best_answer_count);
    }
}
