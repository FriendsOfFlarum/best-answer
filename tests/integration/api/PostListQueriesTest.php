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
use PHPUnit\Framework\Attributes\Test;

class PostListQueriesTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        // Six solved Q&A discussions started by user 2, each answered by user 3.
        $discussions = $posts = $tags = [];

        foreach (range(1, 6) as $id) {
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

    protected function queriesWhenListingPosts(int $pageSize): int
    {
        $this->database()->flushQueryLog();
        $this->database()->enableQueryLog();

        $response = $this->send($this->request('GET', '/api/posts', [
            'authenticatedAs' => 2,
        ])->withQueryParams(['filter' => ['author' => 'normal'], 'page' => ['limit' => $pageSize]]));

        $this->assertEquals(200, $response->getStatusCode());

        $count = count($this->database()->getQueryLog());
        $this->database()->disableQueryLog();

        return $count;
    }

    #[Test]
    public function listing_posts_with_their_discussions_best_answers_does_not_query_per_post()
    {
        // The first request also pays for booting the actor and permissions.
        $this->app();
        $this->queriesWhenListingPosts(1);

        $this->assertSame($this->queriesWhenListingPosts(3), $this->queriesWhenListingPosts(6));
    }

    /**
     * @return string[] type/id of every included resource
     */
    protected function includedWhenListingPostsAs(int $userId): array
    {
        $response = $this->send($this->request('GET', '/api/posts', [
            'authenticatedAs' => $userId,
        ])->withQueryParams(['filter' => ['author' => 'normal']]));

        $this->assertEquals(200, $response->getStatusCode());

        return array_map(
            fn (array $resource) => $resource['type'].'/'.$resource['id'],
            json_decode($response->getBody()->getContents(), true)['included'] ?? []
        );
    }

    #[Test]
    public function a_hidden_best_answer_is_only_included_for_those_who_can_see_it()
    {
        // Discussion 1's best answer, post 12, has been hidden by a moderator.
        $this->prepareDatabase([
            Post::class => [
                ['id' => 12, 'discussion_id' => 1, 'number' => 2, 'user_id' => 3, 'hidden_at' => Carbon::now(), 'hidden_user_id' => 1],
            ],
        ]);

        $this->assertContains('posts/12', $this->includedWhenListingPostsAs(1));

        $includedForMember = $this->includedWhenListingPostsAs(2);
        $this->assertContains('posts/22', $includedForMember);
        $this->assertNotContains('posts/12', $includedForMember);
    }
}
