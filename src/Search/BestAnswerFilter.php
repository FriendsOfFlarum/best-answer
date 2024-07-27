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
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class BestAnswerFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'solved-discussions';
    }

    public function filter(SearchState $filterState, array|string $filterValue, bool $negate): void
    {
        $this->constrain($filterState->getQuery(), $filterState->getActor(), $negate);
    }

    protected function constrain(Builder $query, User $actor, bool $negate): void
    {
        $method = $negate ? 'whereNull' : 'whereNotNull';

        $query->$method('best_answer_post_id');
    }

    protected function allowedQnATags(User $actor): Collection
    {
        return Tag::query()
            ->whereVisibleTo($actor)
            ->where('is_qna', true)
            ->pluck('id');
    }
}
