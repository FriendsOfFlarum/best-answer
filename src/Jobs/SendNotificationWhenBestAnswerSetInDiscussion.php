<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Jobs;

use Flarum\Discussion\Discussion;
use Flarum\Notification\NotificationSyncer;
use Flarum\Post\CommentPost;
use Flarum\Post\Post;
use Flarum\Queue\AbstractJob;
use Flarum\User\User;
use FoF\BestAnswer\Notification;

class SendNotificationWhenBestAnswerSetInDiscussion extends AbstractJob
{
    protected $settings;

    /**
     * $postId defaults to null so jobs queued before it existed still unserialize.
     */
    public function __construct(protected ?Discussion $discussion, protected User $actor, protected ?int $postId = null)
    {
    }

    public function handle(NotificationSyncer $notifications)
    {
        if (!$this->discussion || $this->discussion->best_answer_post_id === null) {
            return;
        }

        // The answer was replaced before this job ran; the job queued for the new answer notifies instead.
        if ($this->postId !== null && $this->discussion->best_answer_post_id !== $this->postId) {
            return;
        }

        $bestAnswerAuthor = $this->getUserFromPost($this->discussion->best_answer_post_id);

        // Send notification to the post author that has been awarded the best answer, except if the best answer was set by the author
        if ($bestAnswerAuthor && $bestAnswerAuthor->id !== $this->actor->id) {
            $notifications->sync(new Notification\AwardedBestAnswerBlueprint($this->discussion, $this->actor), [$bestAnswerAuthor]);
        }

        // Send notifications to the other users who have commented in the discussion and can still see it
        $commenters = Post::select('user_id')
            ->where('discussion_id', $this->discussion->id)
            ->where('type', CommentPost::$type)
            ->whereNull('hidden_at')
            // Private comments, e.g. ones still awaiting approval, don't count, as in core's Discussion::comments().
            ->where('is_private', false);

        $exclude = [$this->actor->id];

        if ($bestAnswerAuthor) {
            array_push($exclude, $bestAnswerAuthor->id);
        }

        $recipients = User::whereIn('id', $commenters)
            ->whereNotIn('id', $exclude)
            ->get()
            // Visibility scopers take a single user, so no one query can find every user who can see the discussion.
            ->filter(fn (User $user) => Discussion::whereVisibleTo($user)->whereKey($this->discussion->id)->exists());

        $notifications->sync(new Notification\BestAnswerSetInDiscussionBlueprint($this->discussion, $this->actor), $recipients->all());
    }

    public function getUserFromPost(int $post_id): ?User
    {
        return Post::find($post_id)->user;
    }
}
