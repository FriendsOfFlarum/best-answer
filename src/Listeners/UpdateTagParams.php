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

use Flarum\Tags\Event\Creating;
use Flarum\Tags\Event\Saving;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;

class UpdateTagParams
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Creating::class, [$this, 'tagCreating']);
        $events->listen(Saving::class, [$this, 'tagEditing']);
    }

    public function tagCreating(Creating $event)
    {
        $event->tag->is_qna = Arr::get($event->data, 'attributes.isQnA');
        $event->tag->qna_reminders = Arr::get($event->data, 'attributes.reminders');

        return $event;
    }

    public function tagEditing(Saving $event)
    {
        $attributes = Arr::get($event->data, 'attributes', []);

        if (isset($attributes['isQnA'])) {
            $event->tag->is_qna = $attributes['isQnA'];
        }

        if (isset($attributes['reminders'])) {
            $event->tag->qna_reminders = $attributes['reminders'];
        }

        return $event;
    }
}
