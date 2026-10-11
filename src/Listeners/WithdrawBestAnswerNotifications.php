<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Listeners;

use Flarum\Notification\Notification;
use FoF\BestAnswer\Events\BestAnswerUnset;
use FoF\BestAnswer\Notification\AwardedBestAnswerBlueprint;
use FoF\BestAnswer\Notification\BestAnswerSetInDiscussionBlueprint;

class WithdrawBestAnswerNotifications
{
    public function handle(BestAnswerUnset $event): void
    {
        // Matched by type and discussion rather than blueprint, so it doesn't matter who chose the answer.
        Notification::query()
            ->whereIn('type', [AwardedBestAnswerBlueprint::getType(), BestAnswerSetInDiscussionBlueprint::getType()])
            ->where('subject_id', $event->discussion->id)
            ->update(['is_deleted' => true]);
    }
}
