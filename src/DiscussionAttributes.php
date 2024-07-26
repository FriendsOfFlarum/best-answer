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

use Flarum\Api\Context;
use Flarum\Api\Schema;
use Flarum\Discussion\Discussion;

class DiscussionAttributes
{
    public function __construct(
        protected BestAnswerRepository $bestAnswerRepository
    ) {
    }

    public function __invoke(): array
    {
        return [
            Schema\Boolean::make('canSelectBestAnswer')
                ->get(fn (Discussion $discussion, Context $context) => $this->bestAnswerRepository->canSelectBestAnswer($context->getActor(), $discussion)),
            Schema\Attribute::make('hasBestAnswer')
                ->get(fn (Discussion $discussion) => $discussion->bestAnswerPost !== null ? $discussion->bestAnswerPost->id : false),
            Schema\DateTime::make('bestAnswerSetAt'),

            Schema\Relationship\ToOne::make('bestAnswerPost')
                ->type('posts')
                ->includable(),
            Schema\Relationship\ToOne::make('bestAnswerUser')
                ->type('users')
                ->includable(),
        ];
    }
}
