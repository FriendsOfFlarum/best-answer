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

use Flarum\Api\Controller;
use Flarum\Api\Serializer;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving as DiscussionSaving;
use Flarum\Discussion\Filter\DiscussionFilterer;
use Flarum\Discussion\Search\DiscussionSearcher;
use Flarum\Extend;
use Flarum\Post\Filter\PostFilterer;
use Flarum\Post\Post;
use Flarum\Settings\Event\Saving as SettingsSaving;
use Flarum\Tags\Api\Serializer\TagSerializer;
use Flarum\Tags\Tag;
use Flarum\User\User;
use Flarum\Api\Context;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource;
use Flarum\Api\Schema;

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
        ->listen(DiscussionSaving::class, Listeners\SaveBestAnswerToDatabase::class)
        ->listen(Events\BestAnswerSet::class, Listeners\QueueNotificationJobs::class)
        ->subscribe(Listeners\RecalculateBestAnswerCounts::class)
        ->listen(SettingsSaving::class, Listeners\SaveTagSettings::class),

    (new Extend\Notification())
        ->type(Notification\SelectBestAnswerBlueprint::class, ['alert', 'email'])
        ->type(Notification\AwardedBestAnswerBlueprint::class, ['alert'])
        ->type(Notification\BestAnswerSetInDiscussionBlueprint::class, []),

    // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
    (new Extend\ApiSerializer(Serializer\DiscussionSerializer::class))
        ->attributes(Api\DiscussionAttributes::class),

    // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
    (new Extend\ApiSerializer(Serializer\BasicDiscussionSerializer::class))
        ->hasOne('bestAnswerPost', Serializer\BasicPostSerializer::class)
        ->hasOne('bestAnswerUser', Serializer\BasicUserSerializer::class)
        ->attributes(Api\BasicDiscussionAttributes::class),

    // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
    (new Extend\ApiSerializer(Serializer\UserSerializer::class))
        ->attributes(Api\UserBestAnswerCount::class),

    // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
    (new Extend\ApiController(Controller\ListUsersController::class))
        ->addSortField('bestAnswerCount'),

    (new Extend\Settings())
        ->default('fof-best-answer.schedule_on_one_server', false)
        ->default('fof-best-answer.stop_overnight', false)
        ->default('fof-best-answer.store_log_output', false)
        ->default('fof-best-answer.enabled-tags', '[]')
        ->default('fof-best-answer.search.solution_search', true)
        ->default('fof-best-answer.search.remove_solutions_from_main_search', false)
        ->default('fof-best-answer.search.display_tags', true)
        ->default('fof-best-answer.discussion_sidebar_jump_button', false)
        ->serializeToForum('fof-best-answer.show_max_lines', 'fof-best-answer.show_max_lines', 'intVal'),

    // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
    (new Extend\ApiSerializer(Serializer\ForumSerializer::class))
        ->attributes(Api\ForumAttributes::class),

    // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
    (new Extend\ApiController(Controller\ShowDiscussionController::class))
        ->addInclude(['bestAnswerPost', 'bestAnswerUser', 'bestAnswerPost.user'])
        ->load(['bestAnswerPost', 'bestAnswerPost.user']),

    // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
    (new Extend\ApiController(Controller\ListDiscussionsController::class))
        ->addOptionalInclude(['bestAnswerPost', 'bestAnswerUser', 'bestAnswerPost.discussion', 'bestAnswerPost.user']),

    // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
    (new Extend\ApiController(Controller\UpdateDiscussionController::class))
        ->addOptionalInclude('tags'),

    // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
    (new Extend\ApiController(Controller\ListPostsController::class))
        ->addInclude(['discussion', 'discussion.bestAnswerPost', 'discussion.bestAnswerUser', 'discussion.bestAnswerPost.user'])
        ->load(['discussion', 'discussion.bestAnswerUser', 'discussion.bestAnswerPost', 'discussion.bestAnswerPost.user']),

    // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
    (new Extend\ApiController(Controller\ShowPostController::class))
        ->addInclude(['discussion', 'discussion.bestAnswerPost', 'discussion.bestAnswerUser', 'discussion.bestAnswerPost.user'])
        ->load(['discussion', 'discussion.bestAnswerUser', 'discussion.bestAnswerPost', 'discussion.bestAnswerPost.user']),

    (new Extend\Console())
        ->command(Console\NotifyCommand::class)
        ->command(Console\UpdateBestAnswerCounts::class)
        ->schedule(Console\NotifyCommand::class, Console\NotifySchedule::class),

    // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
    (new Extend\ApiSerializer(TagSerializer::class))
        ->attributes(Api\AddTagAttributes::class),
    (new Extend\SearchDriver(\Flarum\Search\Database\DatabaseSearchDriver::class))
        ->addFilter(DiscussionSearcher::class, Search\BestAnswerFilter::class)
        ->addFilter(DiscussionSearcher::class, Search\BestAnswerFilter::class)
        ->addFilter(\Flarum\Post\Filter\PostSearcher::class, Search\BestAnswerPostFilter::class),
];
