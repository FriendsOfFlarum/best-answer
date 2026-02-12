<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Api;

use Flarum\Api\Serializer\PostSerializer;
use Flarum\Post\Post;
use FoF\BestAnswer\Repository\BestAnswerRepository;

class PostAttributes
{
    /**
     * @var BestAnswerRepository
     */
    protected $bestAnswerRepository;

    public function __construct(BestAnswerRepository $bestAnswerRepository)
    {
        $this->bestAnswerRepository = $bestAnswerRepository;
    }

    public function __invoke(PostSerializer $serializer, Post $post, array $attributes): array
    {
        $attributes['canSelectAsBestAnswer'] = $this->bestAnswerRepository->canSelectPostAsBestAnswer($serializer->getActor(), $post);

        return $attributes;
    }
}
