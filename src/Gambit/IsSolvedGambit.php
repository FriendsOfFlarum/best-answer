<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Gambit;

use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\SearchState;

class IsSolvedGambit extends AbstractRegexGambit
{
    protected function getGambitPattern()
    {
        return 'is:solved';
    }

    protected function conditions(SearchState $search, array $matches, $negate)
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
