<?php

namespace FoF\BestAnswer\Search;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;
use Flarum\User\User;
use Illuminate\Database\Query\Builder;

class BestAnswerPostFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'is:solution';
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        $this->constrain($filterState->getQuery(), $filterState->getActor(), $negate);
    }

    protected function constrain(Builder $query, User $actor, bool $negate)
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
    }
}
