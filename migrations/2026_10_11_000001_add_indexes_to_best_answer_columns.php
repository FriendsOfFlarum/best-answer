<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

// MySQL indexes these columns through their foreign keys; PostgreSQL and SQLite don't, so every
// post or user deletion scanned the discussions table to apply ON DELETE SET NULL.
$columns = ['best_answer_post_id', 'best_answer_user_id'];

return [
    'up' => function (Builder $schema) use ($columns) {
        foreach ($columns as $column) {
            if (! $schema->hasIndex('discussions', [$column])) {
                $schema->table('discussions', function (Blueprint $table) use ($column) {
                    $table->index($column);
                });
            }
        }
    },
    'down' => function (Builder $schema) use ($columns) {
        $prefix = $schema->getConnection()->getTablePrefix();

        foreach ($columns as $column) {
            if ($schema->hasIndex('discussions', "{$prefix}discussions_{$column}_index")) {
                $schema->table('discussions', function (Blueprint $table) use ($column) {
                    $table->dropIndex([$column]);
                });
            }
        }
    },
];
