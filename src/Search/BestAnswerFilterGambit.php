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

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;
use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\SearchState;
use Flarum\Tags\Tag;
use Flarum\User\User;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;

class BestAnswerFilterGambit extends AbstractRegexGambit implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'solved-discussions';
    }

    protected function getGambitPattern()
    {
        return 'is:solved';
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        $this->constrain($filterState->getQuery(), $filterState->getActor(), $negate);
    }

    protected function constrain(Builder $query, User $actor, bool $negate)
    {
        $method = $negate ? 'whereNull' : 'whereNotNull';

        $query->$method('best_answer_post_id');
    }

    protected function conditions(SearchState $search, array $matches, $negate)
    {
        $actor = $search->getActor();

        $search->getQuery()->where(function ($query) use ($negate, $actor) {
            $method = $negate ? 'whereNull' : 'whereNotNull';

            $query->whereIn('id', function ($query) use ($actor) {
                $query->select('discussion_id')
                    ->from('discussion_tag')
                    ->whereIn('tag_id', $this->allowedQnATags($actor))
                    ->pluck('discussion_id');
            })->$method('best_answer_post_id');
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
