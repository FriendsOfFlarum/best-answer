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
use Flarum\Discussion\Event\Saving;
use Flarum\Event\ConfigureNotificationTypes;
use Flarum\Extend;
use FoF\BestAnswer\Console\NotifyCommand;
use FoF\BestAnswer\Notification\SelectBestAnswerBlueprint;
use FoF\Components\Extend\AddFofComponents;
use FoF\Console\Extend\EnableConsole;
use FoF\Console\Extend\ScheduleCommand;
use Illuminate\Console\Scheduling\Schedule;
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
    new ScheduleCommand(function (Schedule $schedule) {
        $schedule->command(NotifyCommand::class)
            ->hourly()
            ->withoutOverlapping()
            ->appendOutputTo(storage_path('logs'.DIRECTORY_SEPARATOR.'fof-best-answer.log'));
    }),

    new Extend\Compat(function (Dispatcher $events) {
        $events->listen(Configuring::class, function (Configuring $event) {
            if ($event->app->bound(Schedule::class)) {
                $event->addCommand(NotifyCommand::class);
            }
        });

        $events->listen(ConfigureNotificationTypes::class, function (ConfigureNotificationTypes $event) {
            $event->add(SelectBestAnswerBlueprint::class, BasicDiscussionSerializer::class, ['alert']);
        });

        $events->subscribe(Listeners\AddApiAttributes::class);
        $events->listen(Saving::class, Listeners\SelectBestAnswer::class);
    }),
];
