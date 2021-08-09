<?php

namespace FoF\BestAnswer\Listeners;

use Flarum\Tags\Event\Creating;
use Illuminate\Support\Arr;

class TagCreating
{
    public function handle(Creating $event)
    {
        $event->tag->is_qna = Arr::get($event->data, 'attributes.isQnA');

        return $event;
    }
}
