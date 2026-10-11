<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->getConnection()
            ->table('settings')
            ->where('key', 'fof-best-answer.schedule_on_one_server')
            ->delete();
    },
    // The reminder task now always runs with onOneServer(), so there is no setting to restore.
    'down' => function (Builder $schema) {
    },
];
