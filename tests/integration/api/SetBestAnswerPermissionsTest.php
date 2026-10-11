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
use Flarum\Extend;
use Flarum\Post\Post;
use Flarum\Tags\Tag;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;
use PHPUnit\Framework\Attributes\Test;
use Psr\Http\Message\ResponseInterface;

class SetBestAnswerPermissionsTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        // User 2 starts every discussion and holds the default selectBestAnswerOwnDiscussion permission.
        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 3],
            ],
            Tag::class => [
                ['id' => 1, 'is_qna' => true],
                ['id' => 2, 'is_qna' => false],
            ],
            Discussion::class => [
                ['id' => 1, 'user_id' => 2, 'comment_count' => 3],
                ['id' => 2, 'user_id' => 2, 'comment_count' => 2],
                ['id' => 3, 'user_id' => 2, 'comment_count' => 2, 'is_private' => true],
                ['id' => 4, 'user_id' => 3, 'comment_count' => 2],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'number' => 1, 'user_id' => 2],
                ['id' => 2, 'discussion_id' => 1, 'number' => 2, 'user_id' => 3],
                ['id' => 3, 'discussion_id' => 1, 'number' => 3, 'user_id' => 3, 'hidden_at' => Carbon::now(), 'hidden_user_id' => 1],
                ['id' => 4, 'discussion_id' => 2, 'number' => 1, 'user_id' => 2],
                ['id' => 5, 'discussion_id' => 2, 'number' => 2, 'user_id' => 3],
                ['id' => 6, 'discussion_id' => 3, 'number' => 1, 'user_id' => 2],
                ['id' => 7, 'discussion_id' => 3, 'number' => 2, 'user_id' => 3],
                ['id' => 8, 'discussion_id' => 4, 'number' => 1, 'user_id' => 3],
                ['id' => 9, 'discussion_id' => 4, 'number' => 2, 'user_id' => 2],
                ['id' => 10, 'discussion_id' => 1, 'number' => 4, 'user_id' => 3, 'type' => 'discussionRenamed', 'content' => json_encode(['Old title', 'New title'])],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 1],
                ['discussion_id' => 2, 'tag_id' => 2],
                ['discussion_id' => 3, 'tag_id' => 1],
                ['discussion_id' => 4, 'tag_id' => 1],
            ],
        ]);
    }

    protected function setBestAnswer(int $discussionId, int $postId, int $actorId): ResponseInterface
    {
        return $this->send($this->request('PATCH', "/api/discussions/$discussionId", [
            'json' => [
                'data' => [
                    'relationships' => [
                        'bestAnswerPost' => ['data' => ['type' => 'posts', 'id' => (string) $postId]],
                    ],
                ],
            ],
            'authenticatedAs' => $actorId,
        ]));
    }

    protected function assertNoBestAnswer(int $discussionId): void
    {
        $this->assertNull(Discussion::find($discussionId)->best_answer_post_id);
    }

    #[Test]
    public function cannot_set_best_answer_outside_a_qna_tag()
    {
        $response = $this->setBestAnswer(2, 5, 2);

        $this->assertEquals(403, $response->getStatusCode());
        $this->assertNoBestAnswer(2);
    }

    #[Test]
    public function cannot_set_best_answer_in_a_private_discussion()
    {
        // Core hides private discussions from everyone; let user 2 see them, as an extension like byobu would.
        $this->extend(
            (new Extend\ModelVisibility(Discussion::class))
                ->scope(fn (User $actor, Builder $query) => $query->where('discussions.user_id', $actor->id), 'viewPrivate')
        );

        $response = $this->setBestAnswer(3, 7, 2);

        $this->assertEquals(403, $response->getStatusCode());
        $this->assertNoBestAnswer(3);
    }

    #[Test]
    public function cannot_select_a_post_the_actor_cannot_see()
    {
        // Post 3 is hidden, so it is filtered out by core's post visibility before the setter runs.
        $response = $this->setBestAnswer(1, 3, 2);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertNoBestAnswer(1);
    }

    #[Test]
    public function cannot_set_another_users_best_answer_using_a_post_from_your_own_discussion()
    {
        // User 2 may choose answers in discussion 1, but discussion 4 belongs to user 3.
        $response = $this->setBestAnswer(4, 2, 2);

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertNoBestAnswer(4);
    }

    #[Test]
    public function cannot_choose_a_post_from_another_discussion()
    {
        $response = $this->setBestAnswer(4, 2, 1);

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertNoBestAnswer(4);
    }

    #[Test]
    public function cannot_choose_an_event_post()
    {
        // Post 10 records user 3 renaming the discussion; only comments can be answers.
        $response = $this->setBestAnswer(1, 10, 2);

        $this->assertEquals(403, $response->getStatusCode());
        $this->assertNoBestAnswer(1);
    }

    #[Test]
    public function event_posts_are_not_offered_as_best_answers()
    {
        $response = $this->send($this->request('GET', '/api/posts/10', ['authenticatedAs' => 2]));

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertFalse(json_decode($response->getBody()->getContents(), true)['data']['attributes']['canSelectAsBestAnswer']);
    }
}
