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

use Flarum\Api\Controller\ListPostsController;
use Flarum\Api\Controller\ListUsersController;
use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Api\Controller\UpdateDiscussionController;
use Flarum\Api\Serializer;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\Discussion\Filter\DiscussionFilterer;
use Flarum\Discussion\Search\DiscussionSearcher;
use Flarum\Extend;
use Flarum\Post\Post;
use Flarum\Tags\Api\Serializer\TagSerializer;
use Flarum\Tags\Event\Creating as TagCreating;
use Flarum\Tags\Event\Saving as TagSaving;
use Flarum\Tags\Tag;
use Flarum\User\User;
use FoF\BestAnswer\Events\BestAnswerSet;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Routes('api'))
        ->post('/fof/best-answer/enable', 'fof-best-answer.enable-tags-features', Api\Controller\FeatureEnableController::class),

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
        ->listen(Saving::class, Listeners\SaveBestAnswerToDatabase::class)
        ->listen(BestAnswerSet::class, Listeners\QueueNotificationJobs::class)
        ->listen(TagCreating::class, Listeners\TagCreating::class)
        ->listen(TagSaving::class, Listeners\TagEditing::class)
        ->subscribe(Listeners\RecalculateBestAnswerCounts::class),

    (new Extend\Notification())
        ->type(Notification\SelectBestAnswerBlueprint::class, Serializer\BasicDiscussionSerializer::class, ['alert', 'email'])
        ->type(Notification\AwardedBestAnswerBlueprint::class, Serializer\BasicDiscussionSerializer::class, ['alert'])
        ->type(Notification\BestAnswerSetInDiscussionBlueprint::class, Serializer\BasicDiscussionSerializer::class, []),

    (new Extend\ApiSerializer(Serializer\DiscussionSerializer::class))
        ->attribute('canSelectBestAnswer', function (Serializer\DiscussionSerializer $serializer, Discussion $discussion) {
            return resolve(BestAnswerRepository::class)->canSelectBestAnswer($serializer->getActor(), $discussion);
        }),

    (new Extend\ApiSerializer(Serializer\BasicDiscussionSerializer::class))
        ->hasOne('bestAnswerPost', Serializer\BasicPostSerializer::class)
        ->hasOne('bestAnswerUser', Serializer\BasicUserSerializer::class)
        ->attributes(BasicDiscussionAttributes::class),

    (new Extend\ApiSerializer(Serializer\UserSerializer::class))
        ->attributes(UserBestAnswerCount::class),

    (new Extend\ApiController(ListUsersController::class))
        ->addSortField('bestAnswerCount'),

    (new Extend\Settings())
        ->serializeToForum('canSelectBestAnswerOwnPost', 'fof-best-answer.allow_select_own_post', 'boolVal')
        ->serializeToForum('useAlternativeBestAnswerUi', 'fof-best-answer.use_alternative_ui', 'boolVal')
        ->serializeToForum('showBestAnswerFilterUi', 'fof-best-answer.show_filter_dropdown', 'boolVal')
        ->serializeToForum('fof-best-answer.show_max_lines', 'fof-best-answer.show_max_lines', 'intVal')
        ->default('fof-best-answer.schedule_on_one_server', false)
        ->default('fof-best-answer.stop_overnight', false)
        ->default('fof-best-answer.store_log_output', false),

    (new Extend\ApiController(ShowDiscussionController::class))
        ->addInclude(['bestAnswerPost', 'bestAnswerUser'])
        ->load(['bestAnswerPost.user']),

    (new Extend\ApiController(UpdateDiscussionController::class))
        ->addOptionalInclude('tags'),

    (new Extend\ApiController(ListPostsController::class))
        ->addInclude(['discussion.bestAnswerPost', 'discussion.bestAnswerUser', 'discussion.bestAnswerPost.user']),

    (new Extend\SimpleFlarumSearch(DiscussionSearcher::class))
        ->addGambit(Search\BestAnswerFilterGambit::class),

    (new Extend\Console())
        ->command(Console\NotifyCommand::class)
        ->command(Console\UpdateBestAnswerCounts::class)
        ->schedule(Console\NotifyCommand::class, Console\NotifySchedule::class),

    (new Extend\Filter(DiscussionFilterer::class))
        ->addFilter(Search\BestAnswerFilterGambit::class),

    (new Extend\ApiSerializer(TagSerializer::class))
        ->attributes(function (TagSerializer $serializer, Tag $tag, array $attributes) {
            $attributes['isQnA'] = (bool) $tag->is_qna;
            $attributes['reminders'] = (bool) $tag->qna_reminders;

            return $attributes;
        }),
];
