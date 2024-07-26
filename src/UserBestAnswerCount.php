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

use Flarum\Api\Schema;
use Flarum\User\User;

class UserBestAnswerCount
{
    public function __construct(
        public BestAnswerRepository $bestAnswers
    ) {
    }

    public function __invoke(): array
    {
        return [
            Schema\Integer::make('bestAnswerCount')
                ->get(fn (User $user) => $user->best_answer_count ?? $this->bestAnswers->calculateBestAnswersForUser($user)),
        ];
    }
}
