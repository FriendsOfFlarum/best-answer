<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Listeners;

use Flarum\Event\ConfigureDiscussionGambits;
use FoF\BestAnswer\Gambit\IsSolvedGambit;

class AddGambits
{
    public function handle(ConfigureDiscussionGambits $event)
    {
        $event->gambits->add(IsSolvedGambit::class);
    }
}
