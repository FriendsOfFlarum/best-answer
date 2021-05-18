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
use Flarum\User\User;

class Helpers
{
    public static function canSelectBestAnswer(User $user, Discussion $discussion): bool
    {
        // Prevent best answers being set in a private discussion (ie byobu, etc)
        if ($discussion->is_private) {
            return false;
        }

        return $user->id === $discussion->user_id
            ? $user->can('selectBestAnswerOwnDiscussion', $discussion)
            : $user->can('selectBestAnswerNotOwnDiscussion', $discussion);
    }

    public static function canSelectPostAsBestAnswer(User $user, Post $post): bool
    {
        if ((bool) self::canSelectBestAnswer($user, $post->discussion)) {
            return false;
        }

        if ($user->id === $post->user_id) {
            return (bool) resolve('flarum.settings')->get('fof-best-answer.allow_select_own_post');
        }

        return true;
    }
}
