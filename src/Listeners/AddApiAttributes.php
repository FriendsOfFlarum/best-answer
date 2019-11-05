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

use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Event\WillGetData;
use Flarum\Api\Serializer\BasicPostSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\GetModelRelationship;
use Flarum\Post\Post;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
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
        $events->listen(GetModelRelationship::class, [$this, 'getModelRelationship']);
        $events->listen(GetApiRelationship::class, [$this, 'getApiAttributes']);
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
        $events->listen(WillGetData::class, [$this, 'includeBestAnswerPost']);
    }

    public function getModelRelationship(GetModelRelationship $event)
    {
        if ($event->isRelationship(Discussion::class, 'bestAnswerPost')) {
            return $event->model->belongsTo(Post::class, 'best_answer_post_id');
        }
        if ($event->isRelationship(Discussion::class, 'bestAnswerUser')) {
            return $event->model->belongsTo(User::class, 'best_answer_user_id');
        }
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
        }

        if ($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['canSelectBestAnswerOwnPost'] = (bool) app('flarum.settings')->get('fof-best-answer.allow_select_own_post');
        }
    }

    public function includeBestAnswerPost(WillGetData $event)
    {
        if ($event->isController(ShowDiscussionController::class)) {
            $event->addInclude('bestAnswerPost');
            $event->addInclude('bestAnswerUser');
        }
    }
}
