<?php

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

        return $event;
    }
}
