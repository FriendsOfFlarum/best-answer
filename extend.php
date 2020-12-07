<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer;

use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Api\Serializer\BasicDiscussionSerializer;
use Flarum\Api\Serializer\BasicPostSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\Extend;
use Flarum\Foundation\Application;
use Flarum\Post\Post;
use Flarum\User\User;
use FoF\BestAnswer\Console\NotifyCommand;
use FoF\BestAnswer\Events\BestAnswerSet;
use FoF\BestAnswer\Provider\ConsoleProvider;
use FoF\Console\Extend\EnableConsole;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),
    new Extend\Locales(__DIR__.'/resources/locale'),

    new EnableConsole(),

    new DefaultSettings(),

    (new Extend\Model(Discussion::class))
        ->belongsTo('bestAnswerPost', Post::class, 'best_answer_post_id')
        ->belongsTo('bestAnswerUser', User::class, 'best_answer_user_id'),

    (new Extend\Console())
        ->command(NotifyCommand::class),

    (new Extend\View())
        ->namespace('fof-best-answer', __DIR__.'/resources/views'),

    (new Extend\Event())
        ->listen(Saving::class, Listeners\SelectBestAnswer::class)
        ->listen(BestAnswerSet::class, Listeners\QueueNotificationJobs::class),

    (new Extend\Notification())
        ->type(Notification\SelectBestAnswerBlueprint::class, BasicDiscussionSerializer::class, ['alert', 'email'])
        ->type(Notification\AwardedBestAnswerBlueprint::class, BasicDiscussionSerializer::class, ['alert'])
        ->type(Notification\BestAnswerSetInDiscussionBlueprint::class, BasicDiscussionSerializer::class, []),

    (new Extend\ApiSerializer(DiscussionSerializer::class))
        ->hasOne('bestAnswerPost', BasicPostSerializer::class)
        ->hasOne('bestAnswerUser', BasicUserSerializer::class),

    (new Extend\ApiController(ShowDiscussionController::class))
        ->addInclude(['bestAnswerPost', 'bestAnswerPost.discussion', 'bestAnswerPost.user', 'bestAnswerUser']),

    function (Dispatcher $events) {
        $events->subscribe(Listeners\AddApiAttributes::class);
    },

    function (Application $app) {
        $app->register(ConsoleProvider::class);
    },
];
