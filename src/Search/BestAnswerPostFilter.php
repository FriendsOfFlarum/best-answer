<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Search;

use Flarum\Search\Filter\FilterInterface;
use Flarum\Search\SearchState;
use Flarum\Tags\Tag;
use Flarum\User\User;
use Illuminate\Support\Collection;

class BestAnswerPostFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'is:solution';
    }

    public function filter(SearchState $state, array|string $value, bool $negate): void
    {
        $this->constrain($state->getQuery(), $state->getActor(), $negate);
    }

    protected function constrain(\Illuminate\Database\Eloquent\Builder $query, User $actor, bool $negate): void
    {
        // Join the `discussions` table to access `best_answer_post_id`.
        $query->join('discussions', 'posts.discussion_id', '=', 'discussions.id')
            ->where('posts.type', 'comment');

        if ($negate) {
            // Exclude posts that are marked as the best answer
            $query->where(function ($query) {
                $query->whereNull('discussions.best_answer_post_id')
                    ->orWhereColumn('posts.id', '!=', 'discussions.best_answer_post_id');
            });
        } else {
            // Include only posts that are marked as the best answer
            $query->whereNotNull('discussions.best_answer_post_id')
                ->whereColumn('posts.id', '=', 'discussions.best_answer_post_id');
        }

        // Constrain to discussions within the allowed Q&A tags
        $query->whereIn('discussions.id', function ($subQuery) use ($actor) {
            $subQuery->select('discussion_id')
                ->from('discussion_tag')
                ->whereIn('tag_id', $this->allowedQnATags($actor));
        });
    }

    protected function allowedQnATags(User $actor): Collection
    {
        return Tag::query()
            ->whereVisibleTo($actor)
            ->where('is_qna', true)
            ->pluck('id');
    }
}
