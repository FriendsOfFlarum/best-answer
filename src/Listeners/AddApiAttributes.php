<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Listeners;

use Carbon\Carbon;
use DateTime;
use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Event\WillGetData;
use Flarum\Api\Serializer\BasicPostSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\GetApiRelationship;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\BestAnswer\Helpers;
use Illuminate\Contracts\Events\Dispatcher;

class AddApiAttributes
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetApiRelationship::class, [$this, 'getApiAttributes']);
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
        $events->listen(WillGetData::class, [$this, 'includeBestAnswerPost']);
    }

    public function getApiAttributes(GetApiRelationship $event)
    {
        if ($event->isRelationship(DiscussionSerializer::class, 'bestAnswerPost')) {
            return $event->serializer->hasOne($event->model, BasicPostSerializer::class, 'bestAnswerPost');
        }
        if ($event->isRelationship(DiscussionSerializer::class, 'bestAnswerUser')) {
            return $event->serializer->hasOne($event->model, BasicUserSerializer::class, 'bestAnswerUser');
        }
    }

    public function prepareApiAttributes(Serializing $event)
    {
        if ($event->isSerializer(DiscussionSerializer::class)) {
            $event->attributes['canSelectBestAnswer'] = Helpers::canSelectBestAnswer($event->actor, $event->model);
            $event->attributes['hasBestAnswer'] = $event->model->bestAnswerPost()->exists();
            $event->attributes['startUserId'] = $event->model->user_id;
            $event->attributes['firstPostId'] = $event->model->first_post_id;
            if ($event->model->best_answer_set_at) {
                $event->attributes['bestAnswerSetAt'] = Carbon::createFromTimeString($event->model->best_answer_set_at)->format(DateTime::RFC3339);
            }
        }

        if ($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['canSelectBestAnswerOwnPost'] = (bool) app('flarum.settings')->get('fof-best-answer.allow_select_own_post');
            $event->attributes['useAlternativeBestAnswerUi'] = (bool) app('flarum.settings')->get('fof-best-answer.use_alternative_ui', false);
        }
    }

    public function includeBestAnswerPost(WillGetData $event)
    {
        if ($event->isController(ShowDiscussionController::class)) {
            $event->addInclude('bestAnswerPost');
            $event->addInclude('bestAnswerPost.discussion');
            $event->addInclude('bestAnswerPost.user');
            $event->addInclude('bestAnswerUser');
        }
    }
}
