<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasColumn('discussions', 'best_answer_set_at')) {
            $schema->table('discussions', function (Blueprint $table) {
                $table->dateTime('best_answer_set_at')->nullable();
                $table->index('best_answer_set_at');
            });
        }
    },
    'down' => function (Builder $schema) {
        $schema->table('discussions', function (Blueprint $table) {
            $table->dropColumn('best_answer_set_at');
            $table->dropIndex('best_answer_set_at');
        });
    },
];
