<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Api;

use Flarum\Api\Schema;
use Flarum\Settings\SettingsRepositoryInterface;

class ForumAttributes
{
    public function __construct(
        protected SettingsRepositoryInterface $settings
    ) {
    }

    public function __invoke(): array
    {
        return [
            Schema\Boolean::make('bestAnswerDiscussionSidebarJumpButton')
                ->get(fn () => (bool) $this->settings->get('fof-best-answer.discussion_sidebar_jump_button')),

            Schema\Boolean::make('showBestAnswerFilterUi')
                ->get(fn () => (bool) $this->settings->get('fof-best-answer.show_filter_dropdown')),

            Schema\Boolean::make('useAlternativeBestAnswerUi')
                ->get(fn () => (bool) $this->settings->get('fof-best-answer.use_alternative_ui')),

            Schema\Boolean::make('solutionSearchEnabled')
                ->get(fn () => (bool) $this->settings->get('fof-best-answer.search.solution_search')),

            Schema\Boolean::make('removeSolutionResultsFromMainSearch')
                ->get(fn () => (bool) $this->settings->get('fof-best-answer.search.remove_solutions_from_main_search')),

            Schema\Boolean::make('showTagsInSearchResults')
                ->get(fn () => (bool) $this->settings->get('fof-best-answer.search.display_tags')),
        ];
    }
}
