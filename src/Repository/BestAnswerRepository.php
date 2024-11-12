<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Repository;

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Foundation\ValidationException;
use Flarum\Notification\Notification;
use Flarum\Post\Post;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Tag;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use FoF\BestAnswer\Events\BestAnswerSet;
use FoF\BestAnswer\Events\BestAnswerUnset;
use Illuminate\Contracts\Events\Dispatcher;
use Symfony\Contracts\Translation\TranslatorInterface;

class BestAnswerRepository
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var Dispatcher
     */
    protected $events;

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    public function __construct(
        SettingsRepositoryInterface $settings,
        Dispatcher $events,
        TranslatorInterface $translator
    ) {
        $this->settings = $settings;
        $this->events = $events;
        $this->translator = $translator;
    }

    public function canSelectBestAnswer(User $user, Discussion $discussion): bool
    {
        // Prevent best answers being set in a private discussion (ie byobu, etc)
        if ($discussion->is_private) {
            return false;
        }

        return self::tagEnabledForBestAnswer($discussion) && ($user->id === $discussion->user_id
            ? $user->can('selectBestAnswerOwnDiscussion', $discussion)
            : $user->can('selectBestAnswerNotOwnDiscussion', $discussion));
    }

    public function canSelectPostAsBestAnswer(User $user, Post $post): bool
    {
        if (!self::canSelectBestAnswer($user, $post->discussion)) {
            return false;
        }

        if ($user->id === $post->user_id) {
            return (bool) $this->settings->get('fof-best-answer.allow_select_own_post');
        }

        return true;
    }

    public function canRemoveBestAnswer(User $user, Discussion $discussion): bool
    {
        return self::canSelectBestAnswer($user, $discussion);
    }

    public function tagEnabledForBestAnswer(Discussion $discussion): bool
    {
        $enabled = false;

        /** @phpstan-ignore-next-line */
        $discussionTags = $discussion->tags;
        foreach ($discussionTags as $discussionTag) {
            if ((bool) $discussionTag->is_qna) {
                $enabled = true;
                break;
            }
        }

        return $enabled;
    }

    /**
     * Calculate the number of best answers for a user.
     * This is used when `best_answer_count` is `null` on the user, usually because either the user
     * has not already been awarded any best answers, or the extension was updated to include this feature
     * and the user has not yet been serialized.
     *
     * @param User $user
     *
     * @return int
     */
    public function calculateBestAnswersForUser(User $user): int
    {
        $count = Discussion::whereNotNull('best_answer_post_id')
            ->leftJoin('posts', 'posts.id', '=', 'discussions.best_answer_post_id')
            ->where('posts.user_id', $user->id)
            ->count();

        // Use a standalone query and not attribute update+save because otherwise data added by extensions
        // with Extend\ApiController::prepareDataForSerialization() ends up being added to the SQL UPDATE clause,
        // and breaks Flarum since those are often not real columns
        $user->newQuery()
            ->where('id', $user->id)
            ->update(['best_answer_count' => $count]);

        return $count;
    }

    public function removeBestAnswer(Discussion $discussion, User $actor): void
    {
        if (!$this->canRemoveBestAnswer($actor, $discussion)) {
            throw new PermissionDeniedException();
        }

        /** @var Post|null $post */
        $post = $discussion->bestAnswerPost;

        if (!$post) {
            return;
        }

        $discussion->best_answer_post_id = null;
        $discussion->best_answer_user_id = null;
        $discussion->best_answer_set_at = null;
        $discussion->unsetRelation('bestAnswerPost');
        $discussion->unsetRelation('bestAnswerUser');

        $this->changeTags($discussion, 'detach');

        $discussion->afterSave(function ($discussion) use ($actor, $post) {
            $this->events->dispatch(new BestAnswerUnset($discussion, $post, $actor));
        });
    }

    public function setBestAnswer(Discussion $discussion, User $actor, int $id): void
    {
        /** @var Post|null $post */
        $post = $discussion->posts()->find($id);

        if ($id && !$post) {
            throw new ValidationException(
                [
                    'error' => $this->translator->trans('fof-best-answer.forum.errors.mismatch'),
                ]
            );
        }

        if ($post && (!$this->canSelectPostAsBestAnswer($actor, $post) || !$post->isVisibleTo($actor))) {
            throw new PermissionDeniedException();
        }

        if ($id) {
            $discussion->best_answer_post_id = $post->id;
            $discussion->best_answer_user_id = $actor->id;
            $discussion->best_answer_set_at = Carbon::now();

            Notification::where('type', 'selectBestAnswer')->where('subject_id', $discussion->id)->delete();

            $this->changeTags($discussion, 'attach');

            $discussion->afterSave(function (Discussion $discussion) use ($actor) {
                $post = $discussion->bestAnswerPost;
                $this->events->dispatch(new BestAnswerSet($discussion, $post, $actor));
            });
        }
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
