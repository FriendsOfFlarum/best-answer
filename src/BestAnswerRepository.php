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

use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;

class BestAnswerRepository
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function canSelectBestAnswer(User $user, Discussion $discussion): bool
    {
        // Prevent best answers being set in a private discussion (ie byobu, etc)
        if ($discussion->is_private) {
            return false;
        }

        return self::tagEnabledForBestAnswer($discussion) && ($user->id === $discussion->user_id
            ? $user->can('selectBestAnswerOwnDiscussion', $discussion)
            : $user->can('selectBestAnswerNotOwnDiscussion', $discussion));
    }

    public function canSelectPostAsBestAnswer(User $user, Post $post): bool
    {
        if (!self::canSelectBestAnswer($user, $post->discussion)) {
            return false;
        }

        if ($user->id === $post->user_id) {
            return (bool) $this->settings->get('fof-best-answer.allow_select_own_post');
        }

        return true;
    }

    public function tagEnabledForBestAnswer(Discussion $discussion): bool
    {
        $enabled = false;

        /** @phpstan-ignore-next-line */
        $discussionTags = $discussion->tags;
        foreach ($discussionTags as $discussionTag) {
            if ((bool) $discussionTag->is_qna) {
                $enabled = true;
                break;
            }
        }

        return $enabled;
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
    public function calculateBestAnswersForUser(User $user): int
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
