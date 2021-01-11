<?php

namespace FoF\BestAnswer\Gambit;

use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;

class IsSolvedGambit extends AbstractRegexGambit
{
    protected $pattern = 'is:solved';

    protected function conditions(AbstractSearch $search, array $matches, $negate)
    {
        $search->getQuery()->where(function ($query) use ($negate) {
            if ($negate) {
                $query->whereNull('best_answer_post_id');
            } else {
                $query->whereNotNull('best_answer_post_id');
            }
        });
    }
}
