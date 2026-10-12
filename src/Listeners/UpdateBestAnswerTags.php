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

use Flarum\Discussion\Discussion;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Event\DiscussionWasTagged;
use Flarum\Tags\Listener\UpdateTagMetadata;
use Flarum\Tags\Tag;
use Flarum\User\User;
use FoF\BestAnswer\Events\BestAnswerSet;
use FoF\BestAnswer\Events\BestAnswerUnset;
use Illuminate\Contracts\Events\Dispatcher;

/**
 * Adds the configured tags while a discussion has a best answer, and removes them when it no longer does.
 */
class UpdateBestAnswerTags
{
    public function __construct(
        protected SettingsRepositoryInterface $settings,
        protected UpdateTagMetadata $tagMetadata
    ) {
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(BestAnswerSet::class, fn (BestAnswerSet $event) => $this->changeTags($event->discussion, 'attach', $event->actor));
        $events->listen(BestAnswerUnset::class, fn (BestAnswerUnset $event) => $this->changeTags($event->discussion, 'detach', $event->actor));
    }

    protected function changeTags(Discussion $discussion, string $method, User $actor): void
    {
        $tagsToChange = @json_decode($this->settings->get('fof-best-answer.select_best_answer_tags'));

        if (empty($tagsToChange)) {
            return;
        }

        $currentTagIds = $discussion->getConnection()->table('discussion_tag')->where('discussion_id', $discussion->id)->pluck('tag_id');

        $validTags = Tag::query()->whereIn('id', $tagsToChange);

        // Query errors if we try to attach tags that are already attached due to the unique constraint
        if ($method === 'attach') {
            $validTags = $validTags->whereNotIn('id', $currentTagIds);
        }

        $validTagsIds = $validTags->pluck('id');

        if ($validTagsIds->isEmpty()) {
            return;
        }

        $oldTags = Tag::query()->whereIn('id', $currentTagIds)->get()->all();

        /** @phpstan-ignore-next-line */
        $discussion->tags()->$method($validTagsIds);
        $discussion->unsetRelation('tags');

        // Keep tag counts and last-posted discussions right without DiscussionWasTagged's event post.
        $this->tagMetadata->whenDiscussionWasTagged(new DiscussionWasTagged($discussion, $actor, $oldTags));
    }
}
