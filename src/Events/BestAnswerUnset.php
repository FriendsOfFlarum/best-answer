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

class BestAnswerUnset
{
    public function __construct(public Discussion $discussion, public Post $post, public User $actor)
    {
    }
}
