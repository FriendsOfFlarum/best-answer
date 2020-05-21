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

use Flarum\Api\Serializer\BasicDiscussionSerializer;
use Flarum\Console\Event\Configuring;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\Event\ConfigureNotificationTypes;
use Flarum\Extend;
use Flarum\Foundation\Application;
use Flarum\Post\Post;
use Flarum\User\User;
use FoF\BestAnswer\Console\NotifyCommand;
use FoF\BestAnswer\Provider\ConsoleProvider;
use FoF\Components\Extend\AddFofComponents;
use FoF\Console\Extend\EnableConsole;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Contracts\View\Factory;
use Illuminate\Events\Dispatcher;

return [
    new AddFofComponents(),
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

    new Extend\Compat(function (Application $app, Dispatcher $events, Factory $views) {
        $events->listen(Configuring::class, function (Configuring $event) {
            if ($event->app->bound(Schedule::class)) {
                $event->addCommand(NotifyCommand::class);
            }
        });

        $events->listen(ConfigureNotificationTypes::class, function (ConfigureNotificationTypes $event) {
            $event->add(Notification\SelectBestAnswerBlueprint::class, BasicDiscussionSerializer::class, ['alert', 'email']);
            $event->add(Notification\AwardedBestAnswerBlueprint::class, BasicDiscussionSerializer::class, ['alert']);
            $event->add(Notification\BestAnswerSetInDiscussionBlueprint::class, BasicDiscussionSerializer::class, []);
        });

        $events->subscribe(Listeners\AddApiAttributes::class);
        $events->listen(Saving::class, Listeners\SelectBestAnswer::class);

        $events->subscribe(Listeners\QueueNotificationJobs::class);

        $views->addNamespace('fof-best-answer', __DIR__.'/resources/views');

        $app->register(ConsoleProvider::class);
    }),
];
