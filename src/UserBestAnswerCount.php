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

use Flarum\Api\Serializer\UserSerializer;
use Flarum\User\User;

class UserBestAnswerCount
{
    /**
     * @var BestAnswerRepository
     */
    public $bestAnswers;

    public function __construct(BestAnswerRepository $bestAnswers)
    {
        $this->bestAnswers = $bestAnswers;
    }

    public function __invoke(UserSerializer $serializer, User $user, array $attributes): array
    {
        $attributes['bestAnswerCount'] = $user->best_answer_count ?? $this->bestAnswers->calculateBestAnswersForUser($user);

        return $attributes;
    }
}
