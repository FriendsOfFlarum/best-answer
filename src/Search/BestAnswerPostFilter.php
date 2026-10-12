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

use Flarum\Search\Database\DatabaseSearchState;
use Flarum\Search\Filter\FilterInterface;
use Flarum\Search\SearchState;
use Illuminate\Database\Query\Builder;

/**
 * @implements FilterInterface<DatabaseSearchState>
 */
class BestAnswerPostFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'solution';
    }

    public function filter(SearchState $state, array|string $value, bool $negate): void
    {
        // A subquery rather than a join: joining discussions would overwrite posts.* columns like id.
        // whereNotNull keeps NOT IN from matching nothing when a discussion has no best answer.
        $state->getQuery()->{$negate ? 'whereNotIn' : 'whereIn'}(
            'posts.id',
            fn (Builder $query) => $query
                ->select('best_answer_post_id')
                ->from('discussions')
                ->whereNotNull('best_answer_post_id')
        );
    }
}
