<?php

namespace FoF\BestAnswer\Gambit;

use Flarum\Discussion\Search\DiscussionSearch;
use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;
use LogicException;

class IsSolvedGambit extends AbstractRegexGambit
{
    protected $pattern = 'is:solved';

    protected function conditions(AbstractSearch $search, array $matches, $negate)
    {
        if (! $search instanceof DiscussionSearch) {
            throw new LogicException('This gambit can only be applied on a DiscussionSearch');
        }

        $search->getQuery()->where(function ($query) {
            $query->whereNotNull('best_answer_post_id');
        });
    }
}
