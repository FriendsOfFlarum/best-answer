<?php

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
            Schema\Boolean::make('canSelectBestAnswerOwnPost')
                ->get(fn () => (bool) $this->settings->get('fof-best-answer.allow_select_own_post')),

            Schema\Boolean::make('bestAnswerDiscussionSidebarJumpButton')
                ->get(fn () => (bool) $this->settings->get('fof-best-answer.discussion_sidebar_jump_button')),

            Schema\Boolean::make('showBestAnswerFilterUi')
                ->get(fn () => (bool) $this->settings->get('fof-best-answer.show_filter_dropdown')),

            Schema\Boolean::make('bestAnswerDiscussionSidebarJumpButton')
                ->get(fn () => (bool) $this->settings->get('fof-best-answer.discussion_sidebar_jump_button')),

            Schema\Boolean::make('useAlternativeBestAnswerUi')
                ->get(fn () => (bool) $this->settings->get('fof-best-answer.use_alternative_ui')),
        ];
    }
}
