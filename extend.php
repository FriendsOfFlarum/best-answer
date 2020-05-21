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
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\Event\ConfigureNotificationTypes;
use Flarum\Extend;
use Flarum\Foundation\Application;
use Flarum\Post\Post;
use Flarum\User\User;
use FoF\BestAnswer\Console\NotifyCommand;
use FoF\BestAnswer\Events\BestAnswerSet;
use FoF\BestAnswer\Provider\ConsoleProvider;
use FoF\Components\Extend\AddFofComponents;
use FoF\Console\Extend\EnableConsole;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\View\Factory;

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

    (new Extend\Console())
        ->command(NotifyCommand::class),

    function (Dispatcher $events) {
        $events->subscribe(Listeners\AddApiAttributes::class);

        $events->listen(ConfigureNotificationTypes::class, function (ConfigureNotificationTypes $event) {
            $event->add(Notification\SelectBestAnswerBlueprint::class, BasicDiscussionSerializer::class, ['alert', 'email']);
            $event->add(Notification\AwardedBestAnswerBlueprint::class, BasicDiscussionSerializer::class, ['alert']);
            $event->add(Notification\BestAnswerSetInDiscussionBlueprint::class, BasicDiscussionSerializer::class, []);
        });

        $events->listen(Saving::class, Listeners\SelectBestAnswer::class);
        $events->listen(BestAnswerSet::class, Listeners\QueueNotificationJobs::class);
    },

    function (Application $app) {
        $app->register(ConsoleProvider::class);
    },

    function (Factory $views) {
        $views->addNamespace('fof-best-answer', __DIR__.'/resources/views');
    },
];
