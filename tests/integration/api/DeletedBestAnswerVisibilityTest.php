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

/**
 * A best answer that a moderator deletes afterwards stays the discussion's best
 * answer, but readers who can't see deleted posts mustn't receive it.
 */
class DeletedBestAnswerVisibilityTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        $this->prepareDatabase([
            User::class       => [$this->normalUser(), ['id' => 3]],
            Tag::class        => [['id' => 1, 'is_qna' => true]],
            Discussion::class => [
                ['id' => 1, 'user_id' => 2, 'comment_count' => 1, 'first_post_id' => 1, 'last_post_id' => 1, 'last_post_number' => 1, 'best_answer_post_id' => 2, 'best_answer_user_id' => 2],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'number' => 1, 'user_id' => 2, 'type' => 'comment', 'content' => '<t><p>The question.</p></t>'],
                ['id' => 2, 'discussion_id' => 1, 'number' => 2, 'user_id' => 3, 'type' => 'comment', 'content' => '<t><p>The deleted answer.</p></t>', 'hidden_at' => Carbon::now(), 'hidden_user_id' => 1],
            ],
            'discussion_tag' => [['discussion_id' => 1, 'tag_id' => 1]],
        ]);
    }

    protected function get(string $path, ?int $actorId = null): string
    {
        $response = $this->send($this->request('GET', $path, $actorId ? ['authenticatedAs' => $actorId] : []));

        $this->assertEquals(200, $response->getStatusCode());

        return $response->getBody()->getContents();
    }

    #[Test]
    public function a_guest_viewing_the_discussion_does_not_receive_it()
    {
        $body = $this->get('/api/discussions/1');

        $this->assertStringNotContainsString('The deleted answer.', $body);
        $this->assertNull(json_decode($body, true)['data']['relationships']['bestAnswerPost']['data'] ?? null);
    }

    #[Test]
    public function a_guest_listing_the_posts_does_not_receive_it()
    {
        $this->assertStringNotContainsString('The deleted answer.', $this->get('/api/posts?filter[discussion]=1'));
    }

    #[Test]
    public function a_guest_viewing_the_discussion_page_does_not_receive_it()
    {
        $this->assertStringNotContainsString('The deleted answer.', $this->get('/d/1'));
    }

    #[Test]
    public function a_moderator_still_sees_it()
    {
        $body = $this->get('/api/discussions/1', 1);

        $this->assertSame(['type' => 'posts', 'id' => '2'], json_decode($body, true)['data']['relationships']['bestAnswerPost']['data'] ?? null);
        $this->assertStringContainsString('The deleted answer.', $body);
    }
}
