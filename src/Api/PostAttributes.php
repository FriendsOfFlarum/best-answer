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

use Flarum\Api\Context;
use Flarum\Api\Schema;
use Flarum\Post\Post;
use FoF\BestAnswer\Repository\BestAnswerRepository;

class PostAttributes
{
    public function __construct(
        protected BestAnswerRepository $bestAnswerRepository,
    ) {
    }

    public function __invoke(): array
    {
        return [
            Schema\Boolean::make('canSelectAsBestAnswer')
                ->get(fn (Post $post, Context $context) => $this->bestAnswerRepository->canSelectPostAsBestAnswer($context->getActor(), $post)),
        ];
    }
}
