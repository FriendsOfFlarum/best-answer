<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\tests\integration\search;

use Carbon\Carbon;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;

class BestAnswerFilterGambitTest extends TestCase
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
                ['id' => 2, 'title' => __CLASS__, 'user_id' => 1, 'created_at' => Carbon::now(), 'comment_count' => 2, 'best_answer_post_id' => 4, 'best_answer_user_id' => 3, 'best_answer_set_at' => Carbon::now()],
            ],
            'posts' => [
                ['id' => 1, 'discussion_id' => 1, 'user_id' => 1, 'type' => 'comment', 'content' => 'post 1', 'created_at' => Carbon::now()],
                ['id' => 2, 'discussion_id' => 1, 'user_id' => 2, 'type' => 'comment', 'content' => 'post 2', 'created_at' => Carbon::now()],
                ['id' => 3, 'discussion_id' => 2, 'user_id' => 2, 'type' => 'comment', 'content' => 'post 1', 'created_at' => Carbon::now()],
                ['id' => 4, 'discussion_id' => 2, 'user_id' => 3, 'type' => 'comment', 'content' => 'post 2', 'created_at' => Carbon::now()],
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

    public function test_positive_filtering()
    {
        $response = $this->send(
            $this->request(
                'GET',
                '/api/discussions',
                [
                    'authenticatedAs' => 2,
                ]
            )->withQueryParams(['filter' => ['solved-discussions' => 1]])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertCount(1, $data['data']);
        $this->assertEquals(2, $data['data'][0]['id']);
    }

    public function test_negative_filtering()
    {
        $response = $this->send(
            $this->request(
                'GET',
                '/api/discussions',
                [
                    'authenticatedAs' => 2,
                ]
            )->withQueryParams(['filter' => ['-solved-discussions' => 1]])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertCount(1, $data['data']);
        $this->assertEquals(1, $data['data'][0]['id']);
    }

    public function test_positive_search()
    {
        $response = $this->send(
            $this->request(
                'GET',
                '/api/discussions',
                [
                    'authenticatedAs' => 2,
                ]
            )->withQueryParams(['filter' => ['q' => 'is:solved']])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertCount(1, $data['data']);
        $this->assertEquals(2, $data['data'][0]['id']);
    }

    public function test_negative_search()
    {
        $response = $this->send(
            $this->request(
                'GET',
                '/api/discussions',
                [
                    'authenticatedAs' => 2,
                ]
            )->withQueryParams(['filter' => ['q' => '-is:solved']])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertCount(1, $data['data']);
        $this->assertEquals(1, $data['data'][0]['id']);
    }
}
