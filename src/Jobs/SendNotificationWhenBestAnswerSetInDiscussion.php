<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Jobs;

use Flarum\Discussion\Discussion;
use Flarum\Notification\NotificationSyncer;
use Flarum\Post\Post;
use Flarum\User\User;
use FoF\BestAnswer\Notification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;

class SendNotificationWhenBestAnswerSetInDiscussion implements ShouldQueue
{
    use Queueable;
    use SerializesModels;

    /**
     * @var Discussion
     */
    protected $discussion;

    /**
     * @var User
     */
    protected $actor;

    protected $settings;

    public function __construct(
        Discussion $discussion,
        User $actor
    ) {
        $this->discussion = $discussion;
        $this->actor = $actor;
    }

    public function handle(NotificationSyncer $notifications)
    {
        if ($this->discussion === null || $this->discussion->best_answer_post_id === null) {
            return;
        }

        $bestAnswerAuthor = $this->getUserFromPost($this->discussion->best_answer_post_id);

        // Send notification to the post author that has been awarded the best answer, except if the best answer was set by the author
        if ($bestAnswerAuthor && $bestAnswerAuthor->id !== $this->actor->id) {
            $notifications->sync(new Notification\AwardedBestAnswerBlueprint($this->discussion, $this->actor), [$bestAnswerAuthor]);
        }

        // Send notifications to other participants of the discussion
        $recipientsBuilder = User::whereIn('id', Post::select('user_id')->where('discussion_id', $this->discussion->id));

        $exclude = [$this->actor->id];

        if ($bestAnswerAuthor) {
            array_push($exclude, $bestAnswerAuthor->id);
        }

        $recipients = $recipientsBuilder
            ->whereNotIn('id', $exclude)
            ->get();

        $notifications->sync(new Notification\BestAnswerSetInDiscussionBlueprint($this->discussion, $this->actor), $recipients->all());
    }

    public function getUserFromPost(int $post_id): ?User
    {
        return Post::find($post_id)->user;
    }
}
