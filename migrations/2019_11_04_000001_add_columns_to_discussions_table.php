<?php

use Flarum\Discussion\Discussion;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if ($schema->hasColumn('discussions', 'best_answer_notified')) {
            return;
        }

        $schema->table('discussions', function (Blueprint $table) {
            $table->unsignedInteger('best_answer_post_id')->nullable();
            $table->unsignedInteger('best_answer_user_id')->nullable();
            $table->boolean('best_answer_notified');
        });

        Discussion::query()->where('best_answer_notified', false)->update(['best_answer_notified' => 1]);
    },
    'down' => function (Builder $schema) {
        $schema->table('discussions', function (Blueprint $table) {
            $table->dropColumn('best_answer_post_id');
            $table->dropColumn('best_answer_user_id');
            $table->dropColumn('best_answer_notified');
        });
    }
];
