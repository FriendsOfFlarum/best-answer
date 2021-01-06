<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Flarum\Discussion\Discussion;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasColumn('discussions', 'best_answer_user_id')) {
            $schema->table('discussions', function (Blueprint $table) {
                $table->unsignedInteger('best_answer_post_id')->nullable();
                $table->unsignedInteger('best_answer_user_id')->nullable();
            });
        }

        if (!$schema->hasColumn('discussions', 'best_answer_notified')) {
            $schema->table('discussions', function (Blueprint $table) {
                $table->boolean('best_answer_notified');
            });

            Discussion::query()->where('best_answer_notified', false)->update(['best_answer_notified' => 1]);
        }
    },
    'down' => function (Builder $schema) {
        $schema->table('discussions', function (Blueprint $table) {
            $table->dropColumn('best_answer_post_id');
            $table->dropColumn('best_answer_user_id');
            $table->dropColumn('best_answer_notified');
        });
    },
];
