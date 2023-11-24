<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Builder;

$remindersKey = 'fof-best-answer.remind-tags';
$qnaKey = 'fof-best-answer.enabled-tags';

return [
    'up' => function (Builder $schema) use ($remindersKey, $qnaKey) {
        $reminderTagIds = $schema->getConnection()
            ->table('tags')
            ->where('qna_reminders', true)
            ->pluck('id')
            ->map(function ($id) {
                return (string) $id; // Convert each ID to string
            });

        $qnaTagIds = $schema->getConnection()
            ->table('tags')
            ->where('is_qna', true)
            ->pluck('id')
            ->map(function ($id) {
                return (string) $id; // Convert each ID to string
            });

        // Convert the arrays to JSON strings
        $reminderTagIdsJson = json_encode($reminderTagIds->all());
        $qnaTagIdsJson = json_encode($qnaTagIds->all());

        $schema->getConnection()
            ->table('settings')
            ->insertOrIgnore([
                'key'   => $remindersKey,
                'value' => $reminderTagIdsJson,
            ]);

        $schema->getConnection()
            ->table('settings')
            ->insertOrIgnore([
                'key'   => $qnaKey,
                'value' => $qnaTagIdsJson,
            ]);
    },
    'down' => function (Builder $schema) use ($remindersKey, $qnaKey) {
        // Delete the settings keys
        $schema->getConnection()
            ->table('settings')
            ->whereIn('key', [$remindersKey, $qnaKey])
            ->delete();
    },
];
