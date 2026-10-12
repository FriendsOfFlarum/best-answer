<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Listeners;

use Flarum\Discussion\Event\Deleting as DiscussionDeleting;
use Flarum\Post\Event\Deleting as PostDeleting;
use Flarum\Post\Post;
use FoF\BestAnswer\Events\BestAnswerUnset;
use Illuminate\Contracts\Events\Dispatcher;

/**
 * Deleting the best answer, or its discussion, unsets the best answer like removing it would:
 * counts, tags, notifications and the audit log all follow BestAnswerUnset.
 */
class UnsetBestAnswerOnDeletion
{
    public function __construct(protected Dispatcher $events)
    {
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(PostDeleting::class, $this->whenPostIsDeleting(...));
        $events->listen(DiscussionDeleting::class, $this->whenDiscussionIsDeleting(...));
    }

    public function whenPostIsDeleting(PostDeleting $event): void
    {
        $post = $event->post;
        $discussion = $post->discussion;

        if ($discussion->best_answer_post_id !== $post->id) {
            return;
        }

        $discussion->best_answer_post_id = null;
        $discussion->best_answer_user_id = null;
        $discussion->best_answer_set_at = null;
        $discussion->save();

        $this->events->dispatch(new BestAnswerUnset($discussion, $post, $event->actor));
    }

    public function whenDiscussionIsDeleting(DiscussionDeleting $event): void
    {
        $discussion = $event->discussion;
        $post = $discussion->best_answer_post_id ? Post::find($discussion->best_answer_post_id) : null;

        if ($post) {
            $this->events->dispatch(new BestAnswerUnset($discussion, $post, $event->actor));
        }
    }
}
