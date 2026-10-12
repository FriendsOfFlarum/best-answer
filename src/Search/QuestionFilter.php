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
use Flarum\Tags\Tag;

/**
 * Discussions in a Q&A tag. Combine with the solved filter for unsolved questions.
 *
 * @implements FilterInterface<DatabaseSearchState>
 */
class QuestionFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'qna';
    }

    public function filter(SearchState $state, array|string $value, bool $negate): void
    {
        $state->getQuery()->whereIn('discussions.id', function ($query) {
            $query->select('discussion_id')
                ->from('discussion_tag')
                ->whereIn('tag_id', Tag::query()->select('id')->where('is_qna', true));
        }, 'and', $negate);
    }
}
