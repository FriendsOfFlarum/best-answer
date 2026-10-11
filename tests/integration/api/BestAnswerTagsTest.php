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

class BestAnswerTagsTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        // Tag 3 is added to a discussion while it has a best answer.
        $this->setting('fof-best-answer.select_best_answer_tags', '[3]');
    }

    /**
     * Discussion 1 by user 2 in Q&A tag 1, with a reply (post 2) by user 3.
     * When already answered, it has post 2 as its best answer and tag 3 attached, as counted by tag 3.
     */
    protected function seed(bool $answered): void
    {
        $this->prepareDatabase([
            User::class => [$this->normalUser(), ['id' => 3]],
            Tag::class  => [
                ['id' => 1, 'is_qna' => true, 'discussion_count' => 1],
                ['id' => 3, 'discussion_count' => $answered ? 1 : 0],
            ],
            Discussion::class => [
                ['id' => 1, 'user_id' => 2, 'comment_count' => 2, 'first_post_id' => 1, 'last_post_id' => 2, 'last_post_number' => 2, 'best_answer_post_id' => $answered ? 2 : null, 'best_answer_user_id' => $answered ? 2 : null],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'number' => 1, 'user_id' => 2],
                ['id' => 2, 'discussion_id' => 1, 'number' => 2, 'user_id' => 3],
            ],
            'discussion_tag' => $answered
                ? [['discussion_id' => 1, 'tag_id' => 1], ['discussion_id' => 1, 'tag_id' => 3]]
                : [['discussion_id' => 1, 'tag_id' => 1]],
        ]);
    }

    protected function setBestAnswer(?string $postId): void
    {
        $response = $this->send($this->request('PATCH', '/api/discussions/1', [
            'json' => [
                'data' => [
                    'relationships' => [
                        'bestAnswerPost' => ['data' => $postId ? ['type' => 'posts', 'id' => $postId] : null],
                    ],
                ],
            ],
            'authenticatedAs' => 2,
        ]));

        $this->assertEquals(200, $response->getStatusCode());
    }

    protected function discussionCountOfTag(string $tagId): int
    {
        $response = $this->send($this->request('GET', '/api/tags', ['authenticatedAs' => 1]));

        foreach (json_decode($response->getBody()->getContents(), true)['data'] as $tag) {
            if ($tag['id'] === $tagId) {
                return $tag['attributes']['discussionCount'];
            }
        }

        $this->fail("Tag $tagId is missing");
    }

    #[Test]
    public function the_added_tag_counts_the_discussion()
    {
        $this->seed(answered: false);

        $this->setBestAnswer('2');

        $this->assertSame(1, $this->discussionCountOfTag('3'));
        $this->assertSame(1, $this->discussionCountOfTag('1'));

        // The tag is added quietly, without a "discussion tagged" event post in the stream.
        $this->assertFalse($this->database()->table('posts')->where('discussion_id', 1)->where('type', 'discussionTagged')->exists());
    }

    #[Test]
    public function removing_the_best_answer_takes_the_discussion_off_the_tags_count()
    {
        $this->seed(answered: true);

        $this->setBestAnswer(null);

        $this->assertSame(0, $this->discussionCountOfTag('3'));
        $this->assertSame(1, $this->discussionCountOfTag('1'));
    }
}
