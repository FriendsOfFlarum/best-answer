<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
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
    public static function canSelectBestAnswer(User $user, Discussion $discussion)
    {
        // Prevent best answers being set in a private discussion (ie byobu, etc)
        if ($discussion->is_private) {
            return false;
        }

        return $user->id == $discussion->user_id
            ? $user->can('selectBestAnswerOwnDiscussion', $discussion)
            : $user->can('selectBestAnswerNotOwnDiscussion', $discussion);
    }

    public static function canSelectPostAsBestAnswer(User $user, Post $post)
    {
        // Prevent best answers being set in a private discussion (ie byobu, etc)
        if ($post->discussion->is_private) {
            return false;
        }

        $canSelectOwnPost = (bool) app('flarum.settings')->get('fof-best-answer.allow_select_own_post');
        $can = self::canSelectBestAnswer($user, $post->discussion);

        return $user->id == $post->user_id
            ? $canSelectOwnPost && $can
            : $can;
    }

    public static function postBelongsToTargetDiscussion(Post $post, Discussion $discussion): bool
    {
        return $post->exists && $post->discussion_id == $discussion->id;
    }
}
