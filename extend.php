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
use Flarum\Api\Serializer\PostSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\Discussion\Filter\DiscussionFilterer;
use Flarum\Discussion\Search\DiscussionSearcher;
use Flarum\Extend;
use Flarum\Post\Post;
use Flarum\Tags\Api\Serializer\TagSerializer;
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

    (new Extend\Policy())
        ->modelPolicy(Post::class, Access\PostPolicy::class),

    (new Extend\Model(Discussion::class))
        ->belongsToMany('bestAnswers', Post::class, 'discussion_solutions', 'discussion_id', 'solution_id'),

    (new Extend\Model(Post::class))
        ->belongsTo('solutionSetBy', User::class, 'solution_set_by_user_id'),

    (new Extend\View())
        ->namespace('fof-best-answer', __DIR__.'/resources/views'),

    (new Extend\Event())
        ->listen(Saving::class, Listeners\SaveBestAnswerToDatabase::class)
        ->listen(BestAnswerSet::class, Listeners\QueueNotificationJobs::class)
        ->subscribe(Listeners\RecalculateBestAnswerCounts::class)
        ->subscribe(Listeners\UpdateTagParams::class),

    (new Extend\Notification())
        ->type(Notification\SelectBestAnswerBlueprint::class, Serializer\BasicDiscussionSerializer::class, ['alert', 'email'])
        ->type(Notification\AwardedBestAnswerBlueprint::class, Serializer\BasicDiscussionSerializer::class, ['alert'])
        ->type(Notification\BestAnswerSetInDiscussionBlueprint::class, Serializer\BasicDiscussionSerializer::class, []),

    (new Extend\ApiSerializer(PostSerializer::class))
        ->attribute('canSelectAsBestAnswer', function (Serializer\PostSerializer $serializer, Post $post) {
            return $serializer->getActor()->can('selectPostAsBestAnswer', $post);
        }),

    (new Extend\ApiSerializer(Serializer\BasicPostSerializer::class))
        ->hasOne('solutionSetBy', Serializer\BasicUserSerializer::class)
        ->attributes(AddPostAttributes::class),

    (new Extend\ApiSerializer(Serializer\BasicDiscussionSerializer::class))
        ->hasMany('bestAnswers', Serializer\BasicPostSerializer::class)
        ->attribute('hasBestAnswer', function (Serializer\BasicDiscussionSerializer $serializer, Discussion $discussion) {
            return $discussion->bestAnswers()->exists();
        }),

    (new Extend\ApiSerializer(Serializer\UserSerializer::class))
        ->attributes(UserBestAnswerCount::class),

    (new Extend\Settings())
        ->serializeToForum('useAlternativeBestAnswerUi', 'fof-best-answer.use_alternative_ui', 'boolVal')
        ->serializeToForum('showBestAnswerFilterUi', 'fof-best-answer.show_filter_dropdown', 'boolVal')
        ->default('fof-best-answer.schedule_on_one_server', false)
        ->default('fof-best-answer.stop_overnight', false)
        ->default('fof-best-answer.store_log_output', false)
        ->default('fof-best-answer.show_filter_dropdown', true)
        ->default('fof-best-answer.allow_select_own_post', false),

    (new Extend\ApiController(Controller\ShowDiscussionController::class))
        ->addInclude(['bestAnswers', 'posts.solutionSetBy'])
        ->load(['bestAnswers']),

    (new Extend\ApiController(Controller\ListDiscussionsController::class))
        ->addInclude(['bestAnswers', 'posts.solutionSetBy'])
        ->load(['bestAnswers']),

    (new Extend\ApiController(Controller\UpdateDiscussionController::class))
        ->addInclude(['bestAnswers', 'posts.solutionSetBy'])
        ->load(['bestAnswers']),

    (new Extend\ApiController(Controller\ListPostsController::class))
        ->addInclude(['discussion.bestAnswers', 'solutionSetBy'])
        ->load(['solutionSetBy']),

    (new Extend\ApiController(Controller\ShowPostController::class))
        ->addInclude('solutionSetBy')
        ->load('solutionSetBy'),

    (new Extend\ApiController(Controller\CreatePostController::class))
        ->addInclude('solutionSetBy'),

    (new Extend\ApiController(Controller\UpdatePostController::class))
        ->addInclude('solutionSetBy'),

    (new Extend\SimpleFlarumSearch(DiscussionSearcher::class))
        ->addGambit(Search\BestAnswerFilterGambit::class),

    (new Extend\Console())
        ->command(Console\NotifyCommand::class)
        ->schedule(Console\NotifyCommand::class, new Console\NotifySchedule()),

    (new Extend\Filter(DiscussionFilterer::class))
        ->addFilter(Search\BestAnswerFilterGambit::class),

    (new Extend\ApiSerializer(TagSerializer::class))
        ->attributes(AddTagAttributes::class),
];
