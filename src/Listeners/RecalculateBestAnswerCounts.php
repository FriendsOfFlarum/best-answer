<?php

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
            $author->best_answer_count ++;
            $author->save();
        }
    }

    public function subtractBestAnswerCount(BestAnswerUnset $event): void
    {
        $author = $event->post->user;

        if ($author) {
            $author->best_answer_count --;
            $author->save();
        }
    }
}
