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

use Flarum\Discussion\Event\Saving;
use Flarum\Notification\NotificationSyncer;
use FoF\BestAnswer\Repository\BestAnswerRepository;
use FoF\BestAnswer\Notification\SelectBestAnswerBlueprint;
use Illuminate\Support\Arr;

class SaveBestAnswerToDatabase
{
    private $key = 'attributes.bestAnswerPostId';

    /**
     * @var NotificationSyncer
     */
    private $notifications;

    /**
     * @var BestAnswerRepository
     */
    protected $bestAnswer;

    public function __construct(NotificationSyncer $notifications, BestAnswerRepository $bestAnswer)
    {
        $this->notifications = $notifications;
        $this->bestAnswer = $bestAnswer;
    }

    public function handle(Saving $event)
    {
        if (!Arr::has($event->data, $this->key)) {
            return;
        }

        $actor = $event->actor;

        $discussion = $event->discussion;
        /** @var int|null $id */
        $id = (int) Arr::get($event->data, $this->key);

        if (!$discussion->exists || $discussion->best_answer_post_id === $id) {
            return;
        }

        // If 'id' = 0, then we are removing a best answer.
        $function = $id === 0 ? 'removeBestAnswer' : 'setBestAnswer';
        $this->bestAnswer->$function($discussion, $actor, $id);

        $this->notifications->delete(new SelectBestAnswerBlueprint($discussion));
    }
}
