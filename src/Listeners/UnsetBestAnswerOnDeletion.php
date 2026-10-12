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

use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Deleting as DiscussionDeleting;
use Flarum\Post\CommentPost;
use Flarum\Post\Event\Deleting as PostDeleting;
use Flarum\Post\Post;
use Flarum\User\Guest;
use Flarum\User\User;
use FoF\BestAnswer\Events\BestAnswerUnset;
use Illuminate\Contracts\Events\Dispatcher;

/**
 * Deleting the best answer, or its discussion, unsets the best answer like removing it would:
 * counts, tags, notifications and the audit log all follow BestAnswerUnset.
 *
 * The API's Deleting events carry the acting user. Deletes outside the API (console commands, other
 * extensions) only fire Eloquent's model events, so those are handled too, with a guest as the actor.
 * Whichever runs first unsets the answer, so the other finds nothing left to do.
 */
class UnsetBestAnswerOnDeletion
{
    public function __construct(protected Dispatcher $events)
    {
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(PostDeleting::class, fn (PostDeleting $event) => $this->unsetForPost($event->post, $event->actor));
        $events->listen(DiscussionDeleting::class, fn (DiscussionDeleting $event) => $this->unsetForDiscussion($event->discussion, $event->actor));

        // Best answers are always comments, and model events are named after the concrete class.
        $events->listen('eloquent.deleting: '.CommentPost::class, fn (CommentPost $post) => $this->unsetForPost($post, new Guest()));
        $events->listen('eloquent.deleting: '.Discussion::class, fn (Discussion $discussion) => $this->unsetForDiscussion($discussion, new Guest()));
    }

    protected function unsetForPost(Post $post, User $actor): void
    {
        $discussion = $post->discussion;

        if (!$discussion || $discussion->best_answer_post_id !== $post->id) {
            return;
        }

        $discussion->best_answer_post_id = null;
        $discussion->best_answer_user_id = null;
        $discussion->best_answer_set_at = null;
        $discussion->save();

        $this->events->dispatch(new BestAnswerUnset($discussion, $post, $actor));
    }

    protected function unsetForDiscussion(Discussion $discussion, User $actor): void
    {
        $post = $discussion->best_answer_post_id ? Post::find($discussion->best_answer_post_id) : null;

        if (!$post) {
            return;
        }

        // Not saved, as the discussion is being deleted; clearing it marks the answer as handled.
        $discussion->best_answer_post_id = null;

        $this->events->dispatch(new BestAnswerUnset($discussion, $post, $actor));
    }
}
