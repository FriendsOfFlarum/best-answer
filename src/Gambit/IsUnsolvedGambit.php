<?php

namespace FoF\BestAnswer\Gambit;

use Flarum\Discussion\Search\DiscussionSearch;
use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;
use LogicException;

class IsUnsolvedGambit extends AbstractRegexGambit
{
    protected $pattern = 'is:unsolved';

    protected function conditions(AbstractSearch $search, array $matches, $negate)
    {
        if (! $search instanceof DiscussionSearch) {
            throw new LogicException('This gambit can only be applied on a DiscussionSearch');
        }

        $search->getQuery()->where(function ($query) use ($negate) {
            $query->whereNull('best_answer_post_id');
        });
    }
}
