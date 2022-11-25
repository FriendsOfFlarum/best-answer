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

use Carbon\Carbon;
use Flarum\Discussion\Event\Saving;
use Flarum\Notification\NotificationSyncer;
use Flarum\Post\Post;
use FoF\BestAnswer\Events\BestAnswerSet;
use FoF\BestAnswer\Events\BestAnswerUnset;
use FoF\BestAnswer\Notification\SelectBestAnswerBlueprint;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;

class SaveBestAnswerToDatabase
{
    private $key = 'attributes.bestAnswerPostId';

    /**
     * @var NotificationSyncer
     */
    protected $notifications;

    /**
     * @var Dispatcher
     */
    protected $events;

    public function __construct(NotificationSyncer $notifications, Dispatcher $events)
    {
        $this->notifications = $notifications;
        $this->events = $events;
    }

    public function handle(Saving $event)
    {
        if (!Arr::has($event->data, $this->key)) {
            return;
        }
        
        $actor = $event->actor;
        $discussion = $event->discussion;

        /** @var int|null $id */
        $id = Arr::get($event->data, $this->key);

        if (!$discussion->exists) {
            return;
        }

        $post = Post::findOrFail($id);

        $actor->assertCan('selectPostAsBestAnswer', $post);

        $currentlyBestAnswer = $discussion->bestAnswers()->where('solution_id', $post->id)->exists();

        if (! $currentlyBestAnswer) {
            $post->solution_set_by_user_id = $actor->id;
            $post->solution_set_at = Carbon::now();
            $post->save();

            $discussion->bestAnswers()->attach($post->id);

            $this->events->dispatch(new BestAnswerSet($discussion, $post, $actor));

            $this->notifications->delete(new SelectBestAnswerBlueprint($discussion));
        } elseif ($currentlyBestAnswer) {
            $discussion->bestAnswers()->detach($post->id);

            $post->solution_set_by_user_id = null;
            $post->solution_set_at = null;
            $post->save();

            $this->events->dispatch(new BestAnswerUnset($discussion, $post, $actor));

            $this->notifications->restore(new SelectBestAnswerBlueprint($discussion));
        }
    }
}
