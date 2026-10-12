<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Tests\integration\search;

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\Tags\Tag;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

class BestAnswerPostFilterTest extends TestCase
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
                ['id' => 3, 'username' => 'answerer', 'email' => 'answerer@machine.local'],
            ],
            Tag::class => [
                ['id' => 1, 'name' => 'Public', 'slug' => 'public', 'is_restricted' => false],
                ['id' => 2, 'name' => 'Staff', 'slug' => 'staff', 'is_restricted' => true],
            ],
            Discussion::class => [
                ['id' => 1, 'user_id' => 1],
                ['id' => 2, 'user_id' => 1, 'best_answer_post_id' => 4, 'best_answer_user_id' => 3, 'best_answer_set_at' => Carbon::now()],
                ['id' => 3, 'user_id' => 1, 'best_answer_post_id' => 6, 'best_answer_user_id' => 3, 'best_answer_set_at' => Carbon::now()],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'number' => 1, 'user_id' => 1],
                ['id' => 2, 'discussion_id' => 1, 'number' => 2, 'user_id' => 3],
                ['id' => 3, 'discussion_id' => 2, 'number' => 1, 'user_id' => 1],
                ['id' => 4, 'discussion_id' => 2, 'number' => 2, 'user_id' => 3],
                ['id' => 5, 'discussion_id' => 3, 'number' => 1, 'user_id' => 1],
                ['id' => 6, 'discussion_id' => 3, 'number' => 2, 'user_id' => 3],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 1],
                ['discussion_id' => 2, 'tag_id' => 1],
                ['discussion_id' => 3, 'tag_id' => 2],
            ],
        ]);
    }

    /**
     * @param array<string, mixed> $filter
     *
     * @return int[]
     */
    protected function postIds(int $actorId, array $filter): array
    {
        $response = $this->send(
            $this->request('GET', '/api/posts', ['authenticatedAs' => $actorId])
                ->withQueryParams(['filter' => $filter])
        );

        $body = (string) $response->getBody();

        $this->assertEquals(200, $response->getStatusCode(), $body);

        $ids = array_map('intval', array_column(json_decode($body, true)['data'], 'id'));
        sort($ids);

        return $ids;
    }

    #[Test]
    public function solution_filter_returns_only_best_answers(): void
    {
        $this->assertEquals([4, 6], $this->postIds(1, ['solution' => true]));
    }

    #[Test]
    public function negated_solution_filter_returns_every_other_post(): void
    {
        $this->assertEquals([1, 2, 3, 5], $this->postIds(1, ['-solution' => true]));
    }

    #[Test]
    public function solution_filter_skips_best_answers_in_discussions_the_actor_cannot_see(): void
    {
        $this->assertEquals([4], $this->postIds(2, ['solution' => true]));
    }
}
