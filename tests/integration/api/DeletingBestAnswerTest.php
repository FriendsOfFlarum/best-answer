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
use Flarum\Audit\AuditLog;
use Flarum\Audit\AuditLogger;
use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\Tags\Tag;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

class DeletingBestAnswerTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        AuditLogger::$testMode = true;

        $this->extension('flarum-tags', 'fof-best-answer', 'flarum-audit');

        // Tag 3 is added to a discussion while it has a best answer.
        $this->setting('fof-best-answer.select_best_answer_tags', '[3]');

        // A consistently solved discussion: user 3's post 2 is the best answer, tag 3 is attached and counted,
        // user 3 has two best answers, and was told their post was chosen.
        $this->prepareDatabase([
            'audit_log' => [],
            User::class => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'answerer', 'email' => 'answerer@machine.local', 'best_answer_count' => 2],
            ],
            Tag::class => [
                ['id' => 1, 'is_qna' => true, 'discussion_count' => 1],
                ['id' => 3, 'discussion_count' => 1],
            ],
            Discussion::class => [
                ['id' => 1, 'user_id' => 2, 'comment_count' => 2, 'first_post_id' => 1, 'last_post_id' => 2, 'last_post_number' => 2, 'best_answer_post_id' => 2, 'best_answer_user_id' => 2],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'number' => 1, 'user_id' => 2],
                ['id' => 2, 'discussion_id' => 1, 'number' => 2, 'user_id' => 3],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 1],
                ['discussion_id' => 1, 'tag_id' => 3],
            ],
            'notifications' => [
                ['id' => 1, 'user_id' => 3, 'from_user_id' => 2, 'type' => 'awardedBestAnswer', 'subject_id' => 1, 'created_at' => Carbon::now()],
            ],
        ]);
    }

    protected function deleteBestAnswerPost(): void
    {
        $response = $this->send($this->request('DELETE', '/api/posts/2', ['authenticatedAs' => 1, 'json' => []]));

        $this->assertEquals(204, $response->getStatusCode());
    }

    protected function deleteDiscussion(): void
    {
        $response = $this->send($this->request('DELETE', '/api/discussions/1', ['authenticatedAs' => 1, 'json' => []]));

        $this->assertEquals(204, $response->getStatusCode());
    }

    protected function unsetEntriesLogged(): int
    {
        return AuditLog::query()->where('action', 'discussion.best_answer_unset')->count();
    }

    #[Test]
    public function deleting_the_best_answer_post_removes_the_tag_it_added()
    {
        $this->deleteBestAnswerPost();

        $this->assertFalse($this->database()->table('discussion_tag')->where('discussion_id', 1)->where('tag_id', 3)->exists());
        $this->assertSame(0, (int) $this->database()->table('tags')->where('id', 3)->value('discussion_count'));
    }

    #[Test]
    public function deleting_the_best_answer_post_reduces_its_authors_count_once()
    {
        $this->deleteBestAnswerPost();

        $this->assertSame(1, User::find(3)->best_answer_count);
    }

    #[Test]
    public function deleting_the_best_answer_post_withdraws_the_awarded_notification()
    {
        $this->deleteBestAnswerPost();

        $this->assertTrue((bool) $this->database()->table('notifications')->where('id', 1)->value('is_deleted'));
    }

    #[Test]
    public function deleting_the_best_answer_post_is_audited_as_an_unset()
    {
        $this->deleteBestAnswerPost();

        $this->assertSame(1, $this->unsetEntriesLogged());
    }

    #[Test]
    public function deleting_the_discussion_reduces_the_answer_authors_count_once()
    {
        $this->deleteDiscussion();

        $this->assertSame(1, User::find(3)->best_answer_count);
    }

    #[Test]
    public function deleting_the_discussion_is_audited_as_an_unset()
    {
        $this->deleteDiscussion();

        $this->assertSame(1, $this->unsetEntriesLogged());
    }

    #[Test]
    public function deleting_the_best_answer_post_outside_the_api_unsets_it_too()
    {
        // e.g. a console command or another extension calling delete() on the model.
        $this->app();
        Post::find(2)->delete();

        $this->assertNull(Discussion::find(1)->best_answer_post_id);
        $this->assertSame(1, User::find(3)->best_answer_count);
        $this->assertFalse($this->database()->table('discussion_tag')->where('discussion_id', 1)->where('tag_id', 3)->exists());
        $this->assertTrue((bool) $this->database()->table('notifications')->where('id', 1)->value('is_deleted'));
    }

    #[Test]
    public function deleting_the_discussion_outside_the_api_reduces_the_answer_authors_count_once()
    {
        $this->app();
        Discussion::find(1)->delete();

        $this->assertSame(1, User::find(3)->best_answer_count);
    }
}
