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

use Flarum\Tags\Event\Saving;
use Illuminate\Support\Arr;

class TagEditing
{
    public function handle(Saving $event)
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
