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
use Flarum\Group\Group;
use Flarum\Post\Post;
use Flarum\Tags\Tag;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

class BestAnswerInDiscussionRecipientsTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        // The discussion is in a restricted Q&A tag that only the Experts group (5) can see.
        // User 2 asks and user 3 answers. User 4 replies. User 5 only renamed the discussion.
        // User 6's only reply is hidden. User 7 replied but has since left the Experts group.
        // User 8's only reply is private, e.g. still awaiting approval.
        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'answerer', 'email' => 'answerer@machine.local'],
                ['id' => 4, 'username' => 'replier', 'email' => 'replier@machine.local'],
                ['id' => 5, 'username' => 'renamer', 'email' => 'renamer@machine.local'],
                ['id' => 6, 'username' => 'hidden_replier', 'email' => 'hidden_replier@machine.local'],
                ['id' => 7, 'username' => 'former_expert', 'email' => 'former_expert@machine.local'],
                ['id' => 8, 'username' => 'unapproved_replier', 'email' => 'unapproved_replier@machine.local'],
            ],
            Group::class => [
                ['id' => 5, 'name_singular' => 'Expert', 'name_plural' => 'Experts'],
            ],
            'group_user' => [
                ['user_id' => 2, 'group_id' => 5],
                ['user_id' => 3, 'group_id' => 5],
                ['user_id' => 4, 'group_id' => 5],
                ['user_id' => 5, 'group_id' => 5],
                ['user_id' => 6, 'group_id' => 5],
                ['user_id' => 8, 'group_id' => 5],
            ],
            'group_permission' => [
                ['group_id' => 5, 'permission' => 'tag1.viewForum'],
                ['group_id' => 5, 'permission' => 'tag1.discussion.selectBestAnswerOwnDiscussion'],
            ],
            Tag::class => [
                ['id' => 1, 'is_qna' => true, 'is_restricted' => true],
            ],
            Discussion::class => [
                ['id' => 1, 'user_id' => 2, 'comment_count' => 4],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'number' => 1, 'user_id' => 2],
                ['id' => 2, 'discussion_id' => 1, 'number' => 2, 'user_id' => 3],
                ['id' => 3, 'discussion_id' => 1, 'number' => 3, 'user_id' => 4],
                ['id' => 4, 'discussion_id' => 1, 'number' => 4, 'user_id' => 5, 'type' => 'discussionRenamed', 'content' => json_encode(['Old', 'New'])],
                ['id' => 5, 'discussion_id' => 1, 'number' => 5, 'user_id' => 6, 'hidden_at' => Carbon::now(), 'hidden_user_id' => 1],
                ['id' => 6, 'discussion_id' => 1, 'number' => 6, 'user_id' => 7],
                ['id' => 7, 'discussion_id' => 1, 'number' => 7, 'user_id' => 8, 'is_private' => true],
            ],
            'discussion_tag' => [
                ['discussion_id' => 1, 'tag_id' => 1],
            ],
        ]);
    }

    /**
     * The asker (user 2) chooses user 3's reply.
     *
     * @return int[] the users told that a best answer was set
     */
    protected function recipientsAfterChoosingAnAnswer(): array
    {
        $response = $this->send(
            $this->request('PATCH', '/api/discussions/1', [
                'json' => [
                    'data' => [
                        'relationships' => [
                            'bestAnswerPost' => ['data' => ['type' => 'posts', 'id' => '2']],
                        ],
                    ],
                ],
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());

        return $this->database()->table('notifications')
            ->where('type', 'bestAnswerInDiscussion')
            ->where('subject_id', 1)
            ->where('is_deleted', false)
            ->orderBy('user_id')
            ->pluck('user_id')
            ->map(fn ($id) => (int) $id)
            ->all();
    }

    #[Test]
    public function a_commenter_who_can_see_the_discussion_is_notified()
    {
        $this->assertContains(4, $this->recipientsAfterChoosingAnAnswer());
    }

    #[Test]
    public function a_user_whose_only_post_is_an_event_post_is_not_notified()
    {
        $this->assertNotContains(5, $this->recipientsAfterChoosingAnAnswer());
    }

    #[Test]
    public function a_user_whose_only_comment_is_hidden_is_not_notified()
    {
        $this->assertNotContains(6, $this->recipientsAfterChoosingAnAnswer());
    }

    #[Test]
    public function a_commenter_who_can_no_longer_see_the_discussion_is_not_notified()
    {
        $this->assertNotContains(7, $this->recipientsAfterChoosingAnAnswer());
    }

    #[Test]
    public function a_user_whose_only_comment_is_private_is_not_notified()
    {
        $this->assertNotContains(8, $this->recipientsAfterChoosingAnAnswer());
    }
}
