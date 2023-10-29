<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Events;

use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\User\User;

class BestAnswerSet
{
    /**
     * @var Discussion
     */
    public $discussion;

    /**
     * @var Post
     */
    public $post;

    /**
     * @var User
     */
    public $actor;

    /**
     * @param Discussion $discussion
     * @param Post       $post
     * @param User       $actor
     */
    public function __construct(Discussion $discussion, Post $post, User $actor)
    {
        $this->discussion = $discussion;
        $this->post = $post;
        $this->actor = $actor;
    }
}
