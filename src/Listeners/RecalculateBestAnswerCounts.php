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

use FoF\BestAnswer\Events\BestAnswerSet;
use FoF\BestAnswer\Events\BestAnswerUnset;
use Illuminate\Contracts\Events\Dispatcher;

class RecalculateBestAnswerCounts
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(BestAnswerSet::class, [$this, 'addBestAnswerCount']);
        $events->listen(BestAnswerUnset::class, [$this, 'subtractBestAnswerCount']);
    }

    public function addBestAnswerCount(BestAnswerSet $event): void
    {
        $author = $event->post->user;

        if ($author) {
            $author->best_answer_count++;
            $author->save();
        }
    }

    public function subtractBestAnswerCount(BestAnswerUnset $event): void
    {
        $author = $event->post->user;

        if ($author) {
            $author->best_answer_count--;
            $author->save();
        }
    }
}
