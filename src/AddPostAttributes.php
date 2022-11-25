<?php

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
