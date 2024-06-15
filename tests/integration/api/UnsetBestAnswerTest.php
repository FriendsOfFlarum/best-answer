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

class UnsetBestAnswerTest extends TestCase
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
            ],
            'tags' => [
                ['id' => 2, 'name' => 'Q&A', 'slug' => 'q-a', 'description' => 'Q&A description', 'color' => '#FF0000', 'position' => 0, 'parent_id' => null, 'is_restricted' => false, 'is_hidden' => false, 'is_qna' => true],
            ],
            'discussions' => [
                ['id' => 1, 'title' => __CLASS__, 'user_id' => 2, 'created_at' => Carbon::now(), 'comment_count' => 2, 'best_answer_post_id' => 2, 'best_answer_user_id' => 1, 'best_answer_set_at' => Carbon::now()],
            ],
            'posts' => [
                ['id' => 1, 'discussion_id' => 1, 'user_id' => 2, 'type' => 'comment', 'content' => 'post 1 - question', 'created_at' => Carbon::now()],
                ['id' => 2, 'discussion_id' => 1, 'user_id' => 1, 'type' => 'comment', 'content' => 'post 2 - answer1', 'created_at' => Carbon::now()],
                ['id' => 3, 'discussion_id' => 1, 'user_id' => 3, 'type' => 'comment', 'content' => 'post 2 - answer2', 'created_at' => Carbon::now()],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 2],
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

    /**
     * @test
     */
    public function user_can_unset_best_answer_in_own_discussion_and_select_a_different_post()
    {
        // Check best answer is already present
        $response = $this->getBestAnswerDiscussion();

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $attributes = $data['data']['attributes'];
        $this->assertEquals(2, $attributes['hasBestAnswer'], 'Expected best answer post ID to be 2');

        // Unset best answer
        $response = $this->send(
            $this->request(
                'PATCH',
                '/api/discussions/1',
                [
                    'json' => [
                        'data' => [
                            'attributes' => [
                                'bestAnswerPostId' => 0,
                            ],
                        ],

                    ],
                    'authenticatedAs' => 2,
                ],
            )
        );

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
        $response = $this->send(
            $this->request(
                'PATCH',
                '/api/discussions/1',
                [
                    'json' => [
                        'data' => [
                            'attributes' => [
                                'bestAnswerPostId' => 3,
                            ],
                        ],

                    ],
                    'authenticatedAs' => 2,
                ],
            )
        );

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $attributes = $data['data']['attributes'];
        $this->assertEquals(3, $attributes['hasBestAnswer'], 'Expected best answer post ID to be 3');
    }
}
