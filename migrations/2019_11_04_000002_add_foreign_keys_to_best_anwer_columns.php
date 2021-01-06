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
        // Delete rows with non-existent entities so that we will be able to create
        // foreign keys without any issues.
        $connection = $schema->getConnection();
        $connection->table('discussions')
            ->whereNotExists(function ($query) {
                $query->selectRaw(1)->from('posts')->whereColumn('id', 'best_answer_post_id');
            })
            ->update(['best_answer_post_id' => null]);

        $connection->table('discussions')
            ->whereNotExists(function ($query) {
                $query->selectRaw(1)->from('users')->whereColumn('id', 'best_answer_user_id');
            })
            ->update(['best_answer_user_id' => null]);

        $schema->table('discussions', function (Blueprint $table) {
            $table->foreign('best_answer_post_id')->references('id')->on('posts')->onDelete('set null');
            $table->foreign('best_answer_user_id')->references('id')->on('users')->onDelete('set null');
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('discussions', function (Blueprint $table) {
            $table->dropForeign(['best_answer_post_id']);
            $table->dropForeign(['best_answer_user_id']);
        });
    },
];
