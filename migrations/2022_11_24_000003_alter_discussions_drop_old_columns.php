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

return [
    'up' => function (Builder $schema) {
        $schema->table('discussions', function (Blueprint $table) {
            $table->dropForeign(['best_answer_post_id']);
            $table->dropForeign(['best_answer_user_id']);

            $table->dropColumn('best_answer_post_id');
            $table->dropColumn('best_answer_user_id');
            $table->dropColumn('best_answer_set_at');
        });
    },

    'down' => function (Builder $schema) {
        $schema->table('discussions', function (Blueprint $table) {
            $table->integer('best_answer_post_id')->unsigned()->nullable();
            $table->integer('best_answer_user_id')->unsigned()->nullable();
            $table->dateTime('best_answer_set_at')->nullable();

            $table->foreign('best_answer_post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('best_answer_user_id')->references('id')->on('users')->onDelete('cascade');
        });
    },
];
