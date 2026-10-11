<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Tests\integration\console;

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Group\Group;
use Flarum\Notification\NotificationSyncer;
use Flarum\Post\Post;
use Flarum\Tags\Tag;
use Flarum\Testing\integration\ConsoleTestCase;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\User\User;
use Illuminate\Console\Command;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use RuntimeException;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;

class NotifyCommandTest extends ConsoleTestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');
    }

    /**
     * An unanswered Q&A discussion by user 2, started two days ago, with an answer by user 3.
     * With reminders set to one day, it is due a reminder unless an override says otherwise.
     */
    protected function seed(array $discussion = [], array $tag = [], array $answer = [], int $reminderDays = 1): void
    {
        $this->setting('fof-best-answer.select_best_answer_reminder_days', $reminderDays);

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 3],
            ],
            Tag::class => [
                ['id' => 1, 'is_qna' => true, 'qna_reminders' => true, ...$tag],
            ],
            Discussion::class => [
                ['id' => 1, 'user_id' => 2, 'created_at' => Carbon::now()->subDays(2), 'comment_count' => 2, ...$discussion],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'number' => 1, 'user_id' => 2],
                ['id' => 2, 'discussion_id' => 1, 'number' => 2, 'user_id' => 3, ...$answer],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 1],
            ],
        ]);
    }

    protected function reminderSentTo(int $userId): bool
    {
        return $this->database()->table('notifications')
            ->where('type', 'selectBestAnswer')
            ->where('user_id', $userId)
            ->where('subject_id', 1)
            ->exists();
    }

    protected function runReminders(): void
    {
        $this->runCommand(['command' => 'fof:best-answer:notify']);
    }

    #[Test]
    public function reminds_author_when_notified_flag_is_null()
    {
        // NULL as stored for discussions started between the 2025_10_17 migration and the model default.
        $this->seed(discussion: ['best_answer_notified' => null]);

        $this->runReminders();

        $this->assertTrue($this->reminderSentTo(2));
    }

    #[Test]
    public function reminds_author_again_after_best_answer_is_removed()
    {
        $this->seed(discussion: ['best_answer_post_id' => 2, 'best_answer_user_id' => 2, 'best_answer_notified' => true]);

        $response = $this->send(
            $this->request('PATCH', '/api/discussions/1', [
                'json' => [
                    'data' => [
                        'relationships' => [
                            'bestAnswerPost' => ['data' => null],
                        ],
                    ],
                ],
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $this->runReminders();

        $this->assertTrue($this->reminderSentTo(2));
    }

    public static function notDueProvider(): array
    {
        return [
            'hidden discussion'       => [['hidden_at' => Carbon::now()], [], []],
            'private discussion'      => [['is_private' => true], [], []],
            'already answered'        => [['best_answer_post_id' => 2, 'best_answer_user_id' => 2], [], []],
            'already reminded'        => [['best_answer_notified' => true], [], []],
            'no replies'              => [['comment_count' => 1], [], []],
            'started too recently'    => [['created_at' => Carbon::now()], [], []],
            'started too long ago'    => [['created_at' => Carbon::now()->subDays(10)], [], []],
            'tag without reminders'   => [[], ['qna_reminders' => false], []],
            'reminder tag not Q&A'    => [[], ['is_qna' => false], []],
            'only the author replied' => [[], [], ['user_id' => 2]],
        ];
    }

    #[Test]
    #[DataProvider('notDueProvider')]
    public function does_not_remind_when_discussion_is_not_due(array $discussion, array $tag, array $answer)
    {
        $this->seed($discussion, $tag, $answer);

        $this->runReminders();

        $this->assertFalse($this->reminderSentTo(2));
    }

    #[Test]
    public function does_not_remind_when_reminders_are_disabled()
    {
        $this->seed(reminderDays: 0);

        $this->runReminders();

        $this->assertFalse($this->reminderSentTo(2));
    }

    #[Test]
    public function does_not_remind_author_who_cannot_select_a_best_answer()
    {
        $this->seed();

        // Members get this permission from the extension's migration, so take it away for this test.
        $this->app();
        $this->database()->table('group_permission')
            ->where('group_id', Group::MEMBER_ID)
            ->where('permission', 'discussion.selectBestAnswerOwnDiscussion')
            ->delete();

        $this->runReminders();

        $this->assertFalse($this->reminderSentTo(2));
    }

    #[Test]
    public function skips_discussions_whose_author_was_deleted()
    {
        $this->seed();

        // Discussion 2 is otherwise due, but its author's account has been deleted.
        $this->prepareDatabase([
            Discussion::class => [
                ['id' => 2, 'user_id' => null, 'created_at' => Carbon::now()->subDays(2), 'comment_count' => 2],
            ],
            Post::class => [
                ['id' => 3, 'discussion_id' => 2, 'number' => 1, 'user_id' => null],
                ['id' => 4, 'discussion_id' => 2, 'number' => 2, 'user_id' => 3],
            ],
            'discussion_tag' => [
                ['discussion_id' => 2, 'tag_id' => 1],
            ],
        ]);

        $this->runReminders();

        $this->assertTrue($this->reminderSentTo(2));
    }

    #[Test]
    public function exits_with_failure_when_a_reminder_cannot_be_sent()
    {
        $this->seed();

        $syncer = $this->createStub(NotificationSyncer::class);
        $syncer->method('sync')->willThrowException(new RuntimeException('Mail server unavailable'));
        $this->app()->getContainer()->instance(NotificationSyncer::class, $syncer);

        $exitCode = $this->console()->run(new ArrayInput(['command' => 'fof:best-answer:notify']), new BufferedOutput());

        $this->assertSame(Command::FAILURE, $exitCode);
    }

    #[Test]
    public function reminds_a_discussion_in_several_reminder_tags_once()
    {
        $this->seed();

        $this->prepareDatabase([
            Tag::class       => [['id' => 2, 'is_qna' => true, 'qna_reminders' => true]],
            'discussion_tag' => [['discussion_id' => 1, 'tag_id' => 2]],
        ]);

        $this->assertStringContainsString('Sending 1 notifications', $this->runCommand(['command' => 'fof:best-answer:notify']));
    }

    /**
     * A core factory definition as an insertable row, encoded the way prepareDatabase() does it.
     *
     * @param class-string<User|Discussion|Post> $model
     */
    protected function row(string $model, array $attributes = []): array
    {
        return array_map(fn (mixed $value) => is_array($value) ? json_encode($value) : $value, $model::factory()->raw($attributes));
    }

    protected function addDueDiscussions(int $count): void
    {
        $db = $this->database();

        foreach (range(1, $count) as $i) {
            $authorId = $db->table('users')->insertGetId($this->row(User::class));
            $discussionId = $db->table('discussions')->insertGetId($this->row(Discussion::class, ['user_id' => $authorId, 'created_at' => Carbon::now()->subDays(2), 'comment_count' => 2]));
            $db->table('posts')->insert($this->row(Post::class, ['discussion_id' => $discussionId, 'number' => 1, 'user_id' => $authorId]));
            $db->table('posts')->insert($this->row(Post::class, ['discussion_id' => $discussionId, 'number' => 2, 'user_id' => 3]));
            $db->table('discussion_tag')->insert(['discussion_id' => $discussionId, 'tag_id' => 1]);
        }
    }

    protected function postAndTagQueriesWhenReminding(int $dueDiscussions): int
    {
        $this->addDueDiscussions($dueDiscussions);

        $this->database()->flushQueryLog();
        $this->database()->enableQueryLog();

        $this->runReminders();

        $queries = array_filter(
            $this->database()->getQueryLog(),
            fn (array $query) => preg_match('/["`](posts|tags)["`]/', $query['query'])
        );

        $this->database()->disableQueryLog();

        return count($queries);
    }

    #[Test]
    public function checking_discussions_for_reminders_does_not_query_posts_or_tags_per_discussion()
    {
        $this->seed();
        $this->app();
        $this->runReminders();

        $this->assertSame($this->postAndTagQueriesWhenReminding(3), $this->postAndTagQueriesWhenReminding(6));
    }
}
