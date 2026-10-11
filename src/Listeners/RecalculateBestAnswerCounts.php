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
use Flarum\User\User;
use FoF\BestAnswer\Events\BestAnswerSet;
use FoF\BestAnswer\Events\BestAnswerUnset;
use Illuminate\Contracts\Events\Dispatcher;

/**
 * A NULL best_answer_count means "not calculated yet" and is filled in exactly on first read,
 * so these updates leave NULL counts alone and only adjust stored ones, atomically.
 */
class RecalculateBestAnswerCounts
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(BestAnswerSet::class, [$this, 'addBestAnswerCount']);
        $events->listen(BestAnswerUnset::class, [$this, 'subtractBestAnswerCount']);
        $events->listen(PostDeleting::class, [$this, 'handlePostDeletion']);
        $events->listen(DiscussionDeleting::class, [$this, 'handleDiscussionDeletion']);
    }

    public function addBestAnswerCount(BestAnswerSet $event): void
    {
        $this->increment($event->post->user_id);
    }

    public function subtractBestAnswerCount(BestAnswerUnset $event): void
    {
        $this->decrement($event->post->user_id);
    }

    public function handlePostDeletion(PostDeleting $event): void
    {
        $post = $event->post;

        if ($post->discussion->best_answer_post_id === $post->id) {
            $post->discussion->best_answer_post_id = null;
            $post->discussion->best_answer_user_id = null;
            $post->discussion->best_answer_set_at = null;
            $post->discussion->save();

            $this->decrement($post->user_id);
        }
    }

    public function handleDiscussionDeletion(DiscussionDeleting $event): void
    {
        $discussion = $event->discussion;

        if ($discussion->best_answer_post_id) {
            $this->decrement(Post::query()->whereKey($discussion->best_answer_post_id)->value('user_id'));
        }
    }

    protected function increment(?int $userId): void
    {
        if ($userId) {
            User::query()->whereKey($userId)->whereNotNull('best_answer_count')->increment('best_answer_count');
        }
    }

    protected function decrement(?int $userId): void
    {
        if ($userId) {
            User::query()->whereKey($userId)->where('best_answer_count', '>', 0)->decrement('best_answer_count');
        }
    }
}
