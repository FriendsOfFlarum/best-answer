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
            ->insert([
                'key'   => 'fof-best-answer.show_filter_dropdown',
                'value' => true,
            ]);
    },
    'down' => function (Builder $schema) {
        $schema->getConnection()
            ->table('settings')
            ->where('key', 'fof-best-answer.show_filter_dropdown')
            ->delete();
    },
];
