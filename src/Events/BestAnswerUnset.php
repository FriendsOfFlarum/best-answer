<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Events;

use Flarum\Discussion\Discussion;
use Flarum\User\User;

class BestAnswerUnset
{
    /**
     * @var Discussion
     */
    public $discussion;

    /**
     * @var User
     */
    public $actor;

    /**
     * BestAnswerUnset constructor.
     *
     * @param Discussion $discussion
     * @param User       $actor
     */
    public function __construct(Discussion $discussion, User $actor)
    {
        $this->discussion = $discussion;
        $this->actor = $actor;
    }
}
