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

class ShowDiscussionBestAnswerTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');
    }

    /**
     * User 2 asked, and the chooser picked post 2, written by the answer's author, as the best answer.
     * A deleted user is NULL in these columns, as their ON DELETE SET NULL foreign keys leave it.
     */
    protected function seed(?int $answerAuthorId = 3, ?int $chooserId = 2): void
    {
        $this->prepareDatabase([
            User::class       => [$this->normalUser(), ['id' => 3]],
            Tag::class        => [['id' => 1, 'is_qna' => true]],
            Discussion::class => [
                ['id' => 1, 'user_id' => 2, 'comment_count' => 2, 'first_post_id' => 1, 'last_post_id' => 2, 'last_post_number' => 2, 'best_answer_post_id' => 2, 'best_answer_user_id' => $chooserId],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'number' => 1, 'user_id' => 2],
                ['id' => 2, 'discussion_id' => 1, 'number' => 2, 'user_id' => $answerAuthorId],
            ],
            'discussion_tag' => [['discussion_id' => 1, 'tag_id' => 1]],
        ]);
    }

    protected function showDiscussion(): array
    {
        $response = $this->send($this->request('GET', '/api/discussions/1', ['authenticatedAs' => 1]));

        $this->assertEquals(200, $response->getStatusCode());

        return json_decode($response->getBody()->getContents(), true);
    }

    protected function included(array $document, string $type, string $id): ?array
    {
        foreach ($document['included'] ?? [] as $resource) {
            if ($resource['type'] === $type && $resource['id'] === $id) {
                return $resource;
            }
        }

        return null;
    }

    #[Test]
    public function the_best_answers_author_is_included()
    {
        $this->seed();

        $document = $this->showDiscussion();

        $this->assertSame(['type' => 'users', 'id' => '3'], $this->included($document, 'posts', '2')['relationships']['user']['data'] ?? null);
        $this->assertNotNull($this->included($document, 'users', '3'));
    }

    #[Test]
    public function the_discussion_still_loads_when_the_best_answers_author_was_deleted()
    {
        $this->seed(answerAuthorId: null);

        $document = $this->showDiscussion();

        $this->assertSame(['type' => 'posts', 'id' => '2'], $document['data']['relationships']['bestAnswerPost']['data']);
        $this->assertNull($this->included($document, 'posts', '2')['relationships']['user']['data']);
    }

    #[Test]
    public function the_discussion_still_loads_when_the_user_who_chose_the_answer_was_deleted()
    {
        $this->seed(chooserId: null);

        $document = $this->showDiscussion();

        $this->assertSame(['type' => 'posts', 'id' => '2'], $document['data']['relationships']['bestAnswerPost']['data']);
        $this->assertNull($document['data']['relationships']['bestAnswerUser']['data']);
    }
}
