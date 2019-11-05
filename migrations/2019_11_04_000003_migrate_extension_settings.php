<?php

use Flarum\Group\Permission;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        /**
         * @var \Flarum\Settings\SettingsRepositoryInterface
         */
        $settings = app('flarum.settings');

        foreach (['allow_select_own_post', 'select_best_answer_reminder_days'] as $setting) {
            if ($value = $settings->get($key = "flarum-best-answer.$setting")) {
                $settings->set("fof-best-answer.$setting", $value);
                $settings->delete($key);
            }
        }

        Permission::query()
            ->where('permission', 'discussion.selectBestAnswer')
            ->update([
                'permission' => 'discussion.selectBestAnswerOwnDiscussion'
            ]);
    },
    'down' => function (Builder $schema) {
        //
    }
];
