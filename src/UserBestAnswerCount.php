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
use Flarum\Discussion\Discussion;
use Flarum\User\User;

class UserBestAnswerCount
{
    public function __invoke(UserSerializer $serializer, User $user, array $attributes): array
    {
        $attributes['bestAnswerCount'] = $user->best_answer_count ?? $this->calculateBestAnswersForUser($user);

        return $attributes;
    }

    /**
     * Calculate the number of best answers for a user.
     * This is used when `best_answer_count` is `null` on the user, usually because either the user
     * has not already been awarded any best answers, or the extension was updated to include this feature
     * and the user has not yet been serialized.
     *
     * @param User $user
     *
     * @return int
     */
    private function calculateBestAnswersForUser(User $user): int
    {
        $count = Discussion::whereNotNull('best_answer_post_id')
            ->leftJoin('posts', 'posts.id', '=', 'discussions.best_answer_post_id')
            ->where('posts.user_id', $user->id)
            ->count();

        // Use a standalone query and not attribute update+save because otherwise data added by extensions
        // with Extend\ApiController::prepareDataForSerialization() ends up being added to the SQL UPDATE clause,
        // and breaks Flarum since those are often not real columns
        $user->newQuery()
            ->where('id', $user->id)
            ->update(['best_answer_count' => $count]);

        return $count;
    }
}
