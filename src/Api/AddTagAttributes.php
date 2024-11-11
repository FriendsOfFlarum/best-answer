<?php

namespace FoF\BestAnswer\Api;

use Flarum\Tags\Api\Serializer\TagSerializer;
use Flarum\Tags\Tag;

class AddTagAttributes
{
    public function __invoke(TagSerializer $serializer, Tag $tag, array $attributes): array
    {
        $attributes['isQnA'] = (bool) $tag->is_qna;
        $attributes['reminders'] = (bool) $tag->qna_reminders;

        return $attributes;
    }
}
