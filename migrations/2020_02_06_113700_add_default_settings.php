<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

return [
    'up' => function () {
        /**
         * @var \Flarum\Settings\SettingsRepositoryInterface
         */
        $settings = app('flarum.settings');

        $settings->set('fof-best-answer.schedule-on-one-server', false);
        $settings->set('fof-best-answer.stop-overnight', false);
        $settings->set('fof-best-answer.store-log-output', true);
    },
    'down' => function () {
        /**
         * @var \Flarum\Settings\SettingsRepositoryInterface
         */
        $settings = app('flarum.settings');

        $settings->delete('fof-best-answer.schedule-on-one-server');
        $settings->delete('fof-best-answer.stop-overnight');
        $settings->delete('fof-best-answer.store-log-output');
    },
];
