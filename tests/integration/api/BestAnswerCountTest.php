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

use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\Tags\Tag;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

class BestAnswerCountTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');
    }

    /**
     * User 3 wrote the best answer in discussion 1 and an unchosen reply in discussion 2; user 2 asked both.
     */
    protected function seed(?int $storedCount): void
    {
        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 3, 'best_answer_count' => $storedCount],
            ],
            Tag::class => [
                ['id' => 1, 'is_qna' => true],
            ],
            Discussion::class => [
                ['id' => 1, 'user_id' => 2, 'comment_count' => 2, 'first_post_id' => 1, 'last_post_id' => 2, 'last_post_number' => 2, 'best_answer_post_id' => 2, 'best_answer_user_id' => 2],
                ['id' => 2, 'user_id' => 2, 'comment_count' => 2],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'number' => 1, 'user_id' => 2],
                ['id' => 2, 'discussion_id' => 1, 'number' => 2, 'user_id' => 3],
                ['id' => 3, 'discussion_id' => 2, 'number' => 1, 'user_id' => 2],
                ['id' => 4, 'discussion_id' => 2, 'number' => 2, 'user_id' => 3],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 1],
                ['discussion_id' => 2, 'tag_id' => 1],
            ],
        ]);
    }

    protected function bestAnswerCountShownFor(int $userId): int
    {
        $response = $this->send($this->request('GET', "/api/users/$userId", ['authenticatedAs' => 1]));

        return json_decode($response->getBody()->getContents(), true)['data']['attributes']['bestAnswerCount'];
    }

    #[Test]
    public function an_uncalculated_count_includes_earlier_best_answers_when_another_is_awarded()
    {
        $this->seed(null);

        $response = $this->send(
            $this->request('PATCH', '/api/discussions/2', [
                'json' => [
                    'data' => [
                        'relationships' => [
                            'bestAnswerPost' => ['data' => ['type' => 'posts', 'id' => '4']],
                        ],
                    ],
                ],
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertSame(2, $this->bestAnswerCountShownFor(3));
    }

    #[Test]
    public function deleting_a_best_answer_post_never_makes_the_count_negative()
    {
        $this->seed(0);

        $response = $this->send($this->request('DELETE', '/api/posts/2', ['authenticatedAs' => 1, 'json' => []]));

        $this->assertEquals(204, $response->getStatusCode());
        $this->assertSame(0, User::find(3)->best_answer_count);
    }

    #[Test]
    public function deleting_a_discussion_with_a_best_answer_never_makes_the_count_negative()
    {
        $this->seed(0);

        $response = $this->send($this->request('DELETE', '/api/discussions/1', ['authenticatedAs' => 1, 'json' => []]));

        $this->assertEquals(204, $response->getStatusCode());
        $this->assertSame(0, User::find(3)->best_answer_count);
    }

    #[Test]
    public function an_uncalculated_count_stays_exact_when_a_best_answer_post_is_deleted()
    {
        $this->seed(null);

        $response = $this->send($this->request('DELETE', '/api/posts/2', ['authenticatedAs' => 1, 'json' => []]));

        $this->assertEquals(204, $response->getStatusCode());
        $this->assertSame(0, $this->bestAnswerCountShownFor(3));
    }
}
