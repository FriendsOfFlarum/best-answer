<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer;

use Flarum\Api\Endpoint;
use Flarum\Api\Resource;
use Flarum\Api\Schema;
use Flarum\Api\Sort;
use Flarum\Audit\Extend\Audit;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Search\DiscussionSearcher;
use Flarum\Extend;
use Flarum\Post\Post;
use Flarum\Search\Database\DatabaseSearchDriver;
use Flarum\Settings\Event\Saving as SettingsSaving;
use Flarum\Tags\Api\Resource\TagResource;
use Flarum\Tags\Tag;
use Flarum\User\User;
use FoF\BestAnswer\Events\BestAnswerSet;
use FoF\BestAnswer\Events\BestAnswerUnset;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\ServiceProvider())
        ->register(Providers\BestAnswerServiceProvider::class),

    (new Extend\Model(Discussion::class))
        ->belongsTo('bestAnswerPost', Post::class, 'best_answer_post_id')
        ->belongsTo('bestAnswerUser', User::class, 'best_answer_user_id')
        ->cast('best_answer_post_id', 'int')
        ->cast('best_answer_user_id', 'int')
        ->cast('best_answer_set_at', 'datetime')
        ->cast('best_answer_notified', 'boolean'),

    (new Extend\View())
        ->namespace('fof-best-answer', __DIR__.'/resources/views'),

    (new Extend\Model(Tag::class))
        ->cast('is_qna', 'boolean')
        ->cast('qna_reminders', 'boolean'),

    (new Extend\Model(User::class))
        ->cast('best_answer_count', 'int'),

    (new Extend\Event())
        ->listen(Events\BestAnswerSet::class, Listeners\QueueNotificationJobs::class)
        ->subscribe(Listeners\RecalculateBestAnswerCounts::class)
        ->listen(SettingsSaving::class, Listeners\SaveTagSettings::class),

    (new Extend\Notification())
        ->type(Notification\SelectBestAnswerBlueprint::class, ['alert', 'email'])
        ->type(Notification\AwardedBestAnswerBlueprint::class, ['alert'])
        ->type(Notification\BestAnswerSetInDiscussionBlueprint::class, []),

    (new Extend\ApiResource(Resource\ForumResource::class))
        ->fields(Api\ForumAttributes::class),

    (new Extend\ApiResource(Resource\DiscussionResource::class))
        ->fields(Api\DiscussionAttributes::class)
        ->endpoint(Endpoint\Show::class, function (Endpoint\Show $endpoint) {
            return $endpoint
                ->addDefaultInclude(['bestAnswerPost', 'bestAnswerUser'])
                ->eagerLoad(['bestAnswerPost.user']);
        }),

    (new Extend\ApiResource(Resource\PostResource::class))
        ->fields(Api\PostAttributes::class)
        ->endpoint(Endpoint\Index::class, function (Endpoint\Index $endpoint) {
            return $endpoint
                ->addDefaultInclude(['discussion.bestAnswerPost', 'discussion.bestAnswerUser', 'discussion.bestAnswerPost.user']); // @todo: same
        }),

    (new Extend\ApiResource(Resource\UserResource::class))
        ->fields(Api\UserBestAnswerCount::class)
        ->sorts(fn () => [
            Sort\SortColumn::make('bestAnswerCount'),
        ]),

    (new Extend\Conditional())
        ->whenExtensionEnabled('flarum-tags', fn () => [
            (new Extend\ApiResource(TagResource::class))
                ->fields(fn () => [
                    Schema\Boolean::make('isQnA')
                        ->property('is_qna'),
                    Schema\Boolean::make('reminders')
                        ->property('qna_reminders'),
                ]),
        ]),

    (new Extend\Settings())
        ->default('fof-best-answer.schedule_on_one_server', false)
        ->default('fof-best-answer.stop_overnight', false)
        ->default('fof-best-answer.store_log_output', false)
        ->default('fof-best-answer.enabled-tags', '[]')
        ->default('fof-best-answer.discussion_sidebar_jump_button', false)
        ->serializeToForum('fof-best-answer.show_max_lines', 'fof-best-answer.show_max_lines', 'intVal'),

    (new Extend\Console())
        ->command(Console\NotifyCommand::class)
        ->command(Console\UpdateBestAnswerCounts::class)
        ->schedule(Console\NotifyCommand::class, Console\NotifySchedule::class),

    (new Extend\SearchDriver(DatabaseSearchDriver::class))
        ->addFilter(DiscussionSearcher::class, Search\BestAnswerFilter::class),

    (new Extend\Conditional())
        ->whenExtensionEnabled('flarum-audit', fn () => [
            (new Audit())
                ->listen(BestAnswerSet::class, 'discussion.best_answer_set', fn (BestAnswerSet $event) => [
                    'discussion_id' => $event->discussion->id,
                    'post_id'       => $event->post->id,
                ])
                ->listen(BestAnswerUnset::class, 'discussion.best_answer_unset', fn (BestAnswerUnset $event) => [
                    'discussion_id' => $event->discussion->id,
                    'post_id'       => $event->post->id,
                ]),
        ]),
];
