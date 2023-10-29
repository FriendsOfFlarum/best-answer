<?php

namespace FoF\BestAnswer;

use Flarum\Api\Serializer\BasicDiscussionSerializer;
use Flarum\Discussion\Discussion;

class BasicDiscussionAttributes
{
    public function __invoke(BasicDiscussionSerializer $serializer, Discussion $discussion, array $attributes): array
    {
        $attributes['hasBestAnswer'] = $discussion->bestAnswerPost !== null ? $discussion->bestAnswerPost->id : false;
        $attributes['bestAnswerSetAt'] = $discussion->best_answer_set_at ? $discussion->best_answer_set_at->toRFC3339String() : null;
        
        return $attributes;
    }
}
