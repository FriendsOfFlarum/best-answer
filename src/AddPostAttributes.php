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

use Flarum\Api\Serializer\BasicPostSerializer;
use Flarum\Post\CommentPost;
use Flarum\Post\Post;

class AddPostAttributes
{
    public function __invoke(BasicPostSerializer $serializer, Post $post, array $attributes): array
    {
        if ($post instanceof CommentPost && $post->discussion->bestAnswers()->count() > 0) {
            $attributes['solutionSetAt'] = $post->solution_set_at;
        }

        return $attributes;
    }
}
