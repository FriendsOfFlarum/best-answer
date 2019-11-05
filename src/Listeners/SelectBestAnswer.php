<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Listeners;

use Flarum\Discussion\Event\Saving;
use Flarum\Notification\Notification;
use Flarum\Notification\NotificationSyncer;
use Flarum\User\Exception\PermissionDeniedException;
use FoF\BestAnswer\Helpers;
use FoF\BestAnswer\Notification\SelectBestAnswerBlueprint;
use Illuminate\Support\Arr;

class SelectBestAnswer
{
    private $key = 'attributes.bestAnswerPostId';

    /**
     * @var NotificationSyncer
     */
    private $notifications;

    public function __construct(NotificationSyncer $notifications)
    {
        $this->notifications = $notifications;
    }

    public function handle(Saving $event)
    {
        if (!Arr::has($event->data, $this->key)) {
            return;
        }

        $discussion = $event->discussion;
        $id = (int) Arr::get($event->data, $this->key);

        if (!isset($id) || !$discussion->exists || $discussion->best_answer_post_id == $id) {
            return;
        }

        $post = $event->discussion->posts()->find($id);

        if ($post && !Helpers::canSelectPostAsBestAnswer($event->actor, $post)) {
            throw new PermissionDeniedException();
        }

        if ($id > 0) {
            $discussion->best_answer_post_id = $id;
            $discussion->best_answer_user_id = $event->actor->id;

            Notification::where('type', 'selectBestAnswer')->where('subject_id', $discussion->id)->delete();
        } elseif ($id == 0) {
            $discussion->best_answer_post_id = null;
            $discussion->best_answer_user_id = null;
        }

        $this->notifications->delete(new SelectBestAnswerBlueprint($discussion));
    }
}
