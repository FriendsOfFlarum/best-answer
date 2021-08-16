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
use Illuminate\Support\Arr;

class TagCreating
{
    public function handle(Creating $event)
    {
        $event->tag->is_qna = Arr::get($event->data, 'attributes.isQnA');
        $event->tag->qna_reminders = Arr::get($event->data, 'attributes.reminders');

        return $event;
    }
}
