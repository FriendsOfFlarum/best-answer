<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer;

use Carbon\Carbon;
use DateTime;
use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Api\Serializer\BasicDiscussionSerializer;
use Flarum\Api\Serializer\BasicPostSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\Event\ConfigureDiscussionGambits;
use Flarum\Extend;
use Flarum\Post\Post;
use Flarum\User\User;
use FoF\BestAnswer\Console\NotifyCommand;
use FoF\BestAnswer\Console\NotifySchedule;
use FoF\BestAnswer\Events\BestAnswerSet;
use FoF\Components\Extend\AddFofComponents;
use FoF\Console\Extend\EnableConsole;
use FoF\Console\Extend\ScheduleCommand;

return [
    (new AddFofComponents()),

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
        ->listen(BestAnswerSet::class, Listeners\QueueNotificationJobs::class)
        ->listen(ConfigureDiscussionGambits::class, Listeners\AddGambits::class),

    (new Extend\Notification())
        ->type(Notification\SelectBestAnswerBlueprint::class, BasicDiscussionSerializer::class, ['alert', 'email'])
        ->type(Notification\AwardedBestAnswerBlueprint::class, BasicDiscussionSerializer::class, ['alert'])
        ->type(Notification\BestAnswerSetInDiscussionBlueprint::class, BasicDiscussionSerializer::class, []),

    (new Extend\ApiSerializer(DiscussionSerializer::class))
        ->hasOne('bestAnswerPost', BasicPostSerializer::class)
        ->hasOne('bestAnswerUser', BasicUserSerializer::class)
        ->attribute('hasBestAnswer', function (DiscussionSerializer $serializer, AbstractModel $discussion) {
            return $discussion->bestAnswerPost()->exists();
        })
        ->attribute('canSelectBestAnswer', function (DiscussionSerializer $serializer, AbstractModel $discussion) {
            return Helpers::canSelectBestAnswer($serializer->getActor(), $discussion);
        })
        ->attribute('startUserId', function (DiscussionSerializer $serializer, AbstractModel $discussion) {
            return $discussion->user_id;
        })
        ->attribute('firstPostId', function (DiscussionSerializer $serializer, AbstractModel $discussion) {
            return $discussion->first_post_id;
        })
        ->attribute('bestAnswerSetAt', function (DiscussionSerializer $serializer, AbstractModel $discussion) {
            if ($discussion->best_answer_set_at) {
                return Carbon::createFromTimeString($discussion->best_answer_set_at)->format(DateTime::RFC3339);
            }

            return null;
        }),

    (new Extend\Settings())
        ->serializeToForum('canSelectBestAnswerOwnPost', 'fof-best-answer.allow_select_own_post', function ($value) {
            return (bool) $value;
        })
        ->serializeToForum('useAlternativeBestAnswerUi', 'fof-best-answer.use_alternative_ui', function ($value) {
            return (bool) $value;
        }),

    (new Extend\ApiController(ShowDiscussionController::class))
        ->addInclude(['bestAnswerPost', 'bestAnswerPost.discussion', 'bestAnswerPost.user', 'bestAnswerUser']),

    new ScheduleCommand(new NotifySchedule()),
];
