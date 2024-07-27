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

use Carbon\Carbon;
use Flarum\Api\Context;
use Flarum\Api\Schema;
use Flarum\Discussion\Discussion;
use Flarum\Notification\Notification;
use Flarum\Notification\NotificationSyncer;
use Flarum\Post\Post;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Tag;
use Flarum\User\Exception\PermissionDeniedException;
use FoF\BestAnswer\Events\BestAnswerSet;
use FoF\BestAnswer\Events\BestAnswerUnset;
use FoF\BestAnswer\Notification\SelectBestAnswerBlueprint;
use Illuminate\Events\Dispatcher;
use Symfony\Contracts\Translation\TranslatorInterface;

class DiscussionAttributes
{
    public function __construct(
        protected BestAnswerRepository $bestAnswerRepository,
        protected NotificationSyncer $notifications,
        protected Dispatcher $bus,
        protected TranslatorInterface $translator,
        protected SettingsRepositoryInterface $settings
    ) {
    }

    public function __invoke(): array
    {
        return [
            Schema\Boolean::make('canSelectBestAnswer')
                ->get(fn (Discussion $discussion, Context $context) => $this->bestAnswerRepository->canSelectBestAnswer($context->getActor(), $discussion)),
            Schema\Attribute::make('hasBestAnswer')
                ->get(fn (Discussion $discussion) => $discussion->bestAnswerPost !== null ? $discussion->bestAnswerPost->id : false),
            Schema\DateTime::make('bestAnswerSetAt'),

            Schema\Relationship\ToOne::make('bestAnswerPost')
                ->type('posts')
                ->includable()
                ->writableOnUpdate()
                ->set(function (Discussion $discussion, ?Post $post, Context  $context) {
                    $actor = $context->getActor();

                    if ($discussion->best_answer_post_id === $post?->id) {
                        return;
                    }

                    if ($post && (! $this->bestAnswerRepository->canSelectPostAsBestAnswer($actor, $post) || ! $post->isVisibleTo($actor))) {
                        throw new PermissionDeniedException();
                    }

                    // Attaching a best answer.
                    if ($post) {
                        $discussion->best_answer_post_id = $post->id;
                        $discussion->best_answer_user_id = $actor->id;
                        $discussion->best_answer_set_at = Carbon::now();

                        Notification::where('type', 'selectBestAnswer')->where('subject_id', $discussion->id)->delete();

                        $discussion->afterSave(function (Discussion $discussion) use ($actor) {
                            $this->changeTags($discussion, 'attach');

                            $post = $discussion->bestAnswerPost;
                            $this->bus->dispatch(new BestAnswerSet($discussion, $post, $actor));
                        });
                    }
                    // Removing the best answer.
                    else {
                        if (! $discussion->bestAnswerPost) {
                            return;
                        }

                        $post = $discussion->bestAnswerPost;

                        $discussion->best_answer_post_id = null;
                        $discussion->best_answer_user_id = null;
                        $discussion->best_answer_set_at = null;
                        $discussion->unsetRelation('bestAnswerPost');

                        $discussion->afterSave(function (Discussion $discussion) use ($actor, $post) {
                            $this->changeTags($discussion, 'detach');
                            $this->bus->dispatch(new BestAnswerUnset($discussion, $post, $actor));
                        });
                    }

                    $discussion->afterSave(function (Discussion $discussion) {
                        $this->notifications->delete(new SelectBestAnswerBlueprint($discussion));
                    });
                }),
            Schema\Relationship\ToOne::make('bestAnswerUser')
                ->type('users')
                ->includable(),
        ];
    }

    protected function changeTags(Discussion $discussion, string $method)
    {
        $tagsToChange = @json_decode($this->settings->get('fof-best-answer.select_best_answer_tags'));

        if (empty($tagsToChange)) {
            return;
        }

        $validTags = Tag::query()->whereIn('id', $tagsToChange);

        // Query errors if we try to attach tags that are already attached due to the unique constraint
        if ($method === 'attach') {
            /** @phpstan-ignore-next-line */
            $existingTags = $discussion->tags()->pluck('id');
            $validTags = $validTags->whereNotIn('id', $existingTags);
        }

        $validTagsIds = $validTags->pluck('id');

        if ($validTagsIds->isEmpty()) {
            return;
        }

        /** @phpstan-ignore-next-line */
        $discussion->tags()->$method($validTagsIds);
    }
}
