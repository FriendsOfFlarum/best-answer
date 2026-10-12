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

use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\Tags\Tag;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

class QuestionFilterTest extends TestCase
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
            ],
            Tag::class => [
                ['id' => 1, 'name' => 'Support', 'slug' => 'support', 'is_qna' => true],
                ['id' => 2, 'name' => 'General', 'slug' => 'general', 'is_qna' => false],
            ],
            Discussion::class => [
                ['id' => 1, 'title' => 'Unsolved question', 'user_id' => 1, 'first_post_id' => 1],
                ['id' => 2, 'title' => 'Solved question', 'user_id' => 1, 'first_post_id' => 2, 'best_answer_post_id' => 3, 'best_answer_user_id' => 1],
                ['id' => 3, 'title' => 'General chat', 'user_id' => 1, 'first_post_id' => 4],
                ['id' => 4, 'title' => 'Untagged', 'user_id' => 1, 'first_post_id' => 5],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'user_id' => 1, 'number' => 1],
                ['id' => 2, 'discussion_id' => 2, 'user_id' => 1, 'number' => 1],
                ['id' => 3, 'discussion_id' => 2, 'user_id' => 2, 'number' => 2],
                ['id' => 4, 'discussion_id' => 3, 'user_id' => 1, 'number' => 1],
                ['id' => 5, 'discussion_id' => 4, 'user_id' => 1, 'number' => 1],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 1],
                ['discussion_id' => 2, 'tag_id' => 1],
                ['discussion_id' => 3, 'tag_id' => 2],
            ],
        ]);
    }

    protected function discussionIds(array $filter): array
    {
        $response = $this->send(
            $this->request('GET', '/api/discussions', ['authenticatedAs' => 2])
                ->withQueryParams(['filter' => $filter])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $ids = array_map(fn (array $discussion) => (int) $discussion['id'], json_decode($response->getBody()->getContents(), true)['data']);
        sort($ids);

        return $ids;
    }

    #[Test]
    public function it_finds_discussions_in_qna_tags(): void
    {
        $this->assertEquals([1, 2], $this->discussionIds(['qna' => 1]));
    }

    #[Test]
    public function negated_it_finds_every_other_discussion(): void
    {
        $this->assertEquals([3, 4], $this->discussionIds(['-qna' => 1]));
    }

    #[Test]
    public function with_the_unsolved_filter_it_finds_unsolved_questions(): void
    {
        $this->assertEquals([1], $this->discussionIds(['qna' => 1, '-solved-discussions' => 1]));
    }
}
