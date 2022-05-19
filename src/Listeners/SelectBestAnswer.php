<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Listeners;

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\Foundation\ValidationException;
use Flarum\Notification\Notification;
use Flarum\Notification\NotificationSyncer;
use Flarum\Post\Post;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use FoF\BestAnswer\Events\BestAnswerSet;
use FoF\BestAnswer\Events\BestAnswerUnset;
use FoF\BestAnswer\Helpers;
use FoF\BestAnswer\Notification\SelectBestAnswerBlueprint;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Arr;
use Symfony\Contracts\Translation\TranslatorInterface;

class SelectBestAnswer
{
    private $key = 'attributes.bestAnswerPostId';

    /**
     * @var NotificationSyncer
     */
    private $notifications;

    /**
     * @var Dispatcher
     */
    private $bus;

    /**
     * @var TranslatorInterface
     */
    private $translator;

    public function __construct(NotificationSyncer $notifications, Dispatcher $bus, TranslatorInterface $translator)
    {
        $this->notifications = $notifications;
        $this->bus = $bus;
        $this->translator = $translator;
    }

    public function handle(Saving $event)
    {
        if (!Arr::has($event->data, $this->key)) {
            return;
        }

        $actor = $event->actor;

        $discussion = $event->discussion;
        /** @var int|null $id */
        $id = (int) Arr::get($event->data, $this->key);

        if (!$discussion->exists || $discussion->best_answer_post_id === $id) {
            return;
        }

        // If 'id' = 0, then we are removing a best answer.
        if ($id == 0) {
            $this->removeBestAnswer($discussion, $actor);
        } else {
            $this->setBestAnswer($discussion, $actor, $id);
        }

        $this->notifications->delete(new SelectBestAnswerBlueprint($discussion));
    }

    private function removeBestAnswer(Discussion $discussion, User $actor): void
    {
        $post = $discussion->bestAnswerPost;

        $discussion->best_answer_post_id = null;
        $discussion->best_answer_user_id = null;
        $discussion->best_answer_set_at = null;

        $discussion->afterSave(function ($discussion) use ($actor, $post) {
            $this->bus->dispatch(new BestAnswerUnset($discussion, $post, $actor));
        });
    }

    private function setBestAnswer(Discussion $discussion, User $actor, int $id): void
    {
        /** @var Post $post */
        $post = $discussion->posts()->find($id);

        if ($id && !$post) {
            throw new ValidationException(
                [
                    'error' => $this->translator->trans('fof-best-answer.forum.errors.mismatch'),
                ]
            );
        }

        if ($post && (!Helpers::canSelectPostAsBestAnswer($actor, $post) || !$post->isVisibleTo($actor))) {
            throw new PermissionDeniedException();
        }

        if ($id) {
            $discussion->best_answer_post_id = $post->id;
            $discussion->best_answer_user_id = $actor->id;
            $discussion->best_answer_set_at = Carbon::now();

            Notification::where('type', 'selectBestAnswer')->where('subject_id', $discussion->id)->delete();
            $discussion->afterSave(function (Discussion $discussion) use ($actor) {
                $post = $discussion->bestAnswerPost;
                $this->bus->dispatch(new BestAnswerSet($discussion, $post, $actor));
            });
        }
    }
}
