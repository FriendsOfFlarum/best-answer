<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
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
    }
];
