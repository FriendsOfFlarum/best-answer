<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Carbon\Carbon;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $db = $schema->getConnection();
        $discussions = $db->table('discussions')->whereNotNull('best_answer_post_id')->orderBy('id', 'desc');

        $discussions->each(function ($discussion) use ($db) {
            $post = $db->table('posts')->where('id', $discussion->best_answer_post_id)->first();

            $db->table('discussion_solutions')->insert([
                'discussion_id' => $discussion->id,
                'solution_id'   => $post->id,
                'created_at'    => $discussion->best_answer_set_at,
                'updated_at'    => Carbon::now(),
            ]);

            $db->table('posts')->where('id', $post->id)->update([
                'solution_set_at'         => $discussion->best_answer_set_at,
                'solution_set_by_user_id' => $discussion->best_answer_user_id,
            ]);
        });
    },

    'down' => function (Builder $schema) {
        // $db = $schema->getConnection();

        // $db->table('discussion_solutions')->each(function ($solution) use ($db) {
        //     $db->table('discussions')->where('id', $solution->discussion_id)->update([
        //         'best_answer_post_id' => $solution->solution_id,
        //         'best_answer_set_at' => $solution->created_at,
        //         'best_answer_user_id' => $solution->solution_set_by_user_id,
        //     ]);
        // });

        // Actually, this should probably be a one-way thing.
    },
];
