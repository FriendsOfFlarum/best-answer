<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('discussion_solutions', function (Blueprint $table) {
            $table->integer('discussion_id')->unsigned();
            $table->integer('solution_id')->unsigned();
            $table->dateTime('created_at')->useCurrent()->nullable();
            $table->dateTime('updated_at')->useCurrent()->nullable();
            $table->primary(['discussion_id', 'solution_id']);

            $table->foreign('discussion_id')->references('id')->on('discussions')->onDelete('cascade');
            $table->foreign('solution_id')->references('id')->on('posts')->onDelete('cascade');
        });
    },

    'down' => function (Builder $schema) {
        $schema->drop('discussion_solutions');
    }
];
