<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
