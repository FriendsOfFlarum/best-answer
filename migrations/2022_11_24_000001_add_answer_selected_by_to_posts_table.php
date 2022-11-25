<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('posts', function (Blueprint $table) {
            $table->integer('solution_set_by_user_id')->unsigned()->nullable();
            $table->dateTime('solution_set_at')->nullable();

            $table->foreign('solution_set_by_user_id')->references('id')->on('users')->onDelete('cascade');
        });
    },

    'down' => function (Builder $schema) {
        $schema->table('posts', function (Blueprint $table) {
            $table->dropForeign(['solution_set_by_user_id']);
            $table->dropColumn(['solution_set_at', 'solution_set_by_user_id']);
        });
    }
];
