<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Access;

use Flarum\Discussion\Discussion;
use Flarum\Extension\ExtensionManager;
use Flarum\Post\CommentPost;
use Flarum\Post\Post;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class PostPolicy extends AbstractPolicy
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var ExtensionManager
     */
    public $extensions;

    public function __construct(SettingsRepositoryInterface $settings, ExtensionManager $extensions)
    {
        $this->settings = $settings;
        $this->extensions = $extensions;
    }

    // // old code
    // public function canSelectPostAsBestAnswer(User $user, Post $post)
    // {
    //     if ($user->cannot('selectBestAnswer', $post->discussion)) {
    //         return $this->deny();
    //     }

    //     if ($user->id === $post->user_id) {
    //         return (bool) $this->settings->get('fof-best-answer.allow_select_own_post');
    //     }

    //     return true;
    // }

    public function selectPostAsBestAnswer(User $actor, Post $post)
    {
        if (!$this->tagEnabledForBestAnswer($post->discussion)) {
            return $this->deny();
        }

        // We don't have the first post in a discussion as the best answer
        if ($post->number === 1) {
            return $this->deny();
        }

        // Best answers are only valid for CommentPost types
        if (!$post instanceof CommentPost) {
            return $this->deny();
        }

        if (!$post->hidden_at !== null) {
            //return $this->deny();
        }

        // Own discussion
        if ($post->discussion->user_id == $actor->id && $actor->can('selectBestAnswerOwnDiscussion', $post->discussion)) {
            if ($post->user_id === $actor->id) {
                return (bool) $this->settings->get('fof-best-answer.allow_select_own_post');
            }

            return $this->allow();
        }

        // Other user's discussion
        if ($post->discussion->user_id != $actor->id && $actor->can('selectBestAnswerNotOwnDiscussion', $post->discussion)) {
            return $this->allow();
        }
    }

    protected function tagEnabledForBestAnswer(Discussion $discussion): bool
    {
        // If flarum/tags is not enabled, then we allow best answers anyway, but still subject to other permissions.
        if (!$this->extensions->isEnabled('flarum-tags')) {
            return true;
        }

        $enabled = false;

        $discussionTags = $discussion->tags;
        foreach ($discussionTags as $discussionTag) {
            if ((bool) $discussionTag->is_qna) {
                $enabled = true;
                break;
            }
        }

        return $enabled;
    }
}
