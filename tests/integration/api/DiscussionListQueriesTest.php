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

class DiscussionListQueriesTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        // Three solved Q&A discussions, each answered by user 3.
        $discussions = $posts = $tags = [];

        foreach ([1, 2, 3] as $id) {
            $discussions[] = ['id' => $id, 'user_id' => 2, 'comment_count' => 2, 'best_answer_post_id' => $id * 10 + 2, 'best_answer_user_id' => 2];
            $posts[] = ['id' => $id * 10 + 1, 'discussion_id' => $id, 'number' => 1, 'user_id' => 2];
            $posts[] = ['id' => $id * 10 + 2, 'discussion_id' => $id, 'number' => 2, 'user_id' => 3];
            $tags[] = ['discussion_id' => $id, 'tag_id' => 1];
        }

        $this->prepareDatabase([
            User::class       => [$this->normalUser(), ['id' => 3]],
            Tag::class        => [['id' => 1, 'is_qna' => true]],
            Discussion::class => $discussions,
            Post::class       => $posts,
            'discussion_tag'  => $tags,
        ]);
    }

    protected function postLookupsWhenListing(int $pageSize): int
    {
        $this->app();
        $this->database()->flushQueryLog();
        $this->database()->enableQueryLog();

        $response = $this->send($this->request('GET', '/api/discussions', [
            'authenticatedAs' => 2,
        ])->withQueryParams(['page' => ['limit' => $pageSize]]));

        $this->assertEquals(200, $response->getStatusCode());

        $lookups = array_filter(
            $this->database()->getQueryLog(),
            fn (array $query) => preg_match('/from ["`]posts["`] where ["`]posts["`]\.["`]id["`] = \?/', $query['query'])
        );

        $this->database()->disableQueryLog();

        return count($lookups);
    }

    #[Test]
    public function listing_discussions_does_not_load_each_best_answer_post()
    {
        $this->assertSame($this->postLookupsWhenListing(1), $this->postLookupsWhenListing(3));
    }
}
