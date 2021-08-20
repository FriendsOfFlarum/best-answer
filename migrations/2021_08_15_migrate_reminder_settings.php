<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Tag;
use Illuminate\Database\Schema\Builder;

$remindersKey = 'fof-best-answer.remind_tag_ids';

return [
    'up' => function (Builder $schema) use ($remindersKey) {
        /** @var SettingsRepositoryInterface $settings */
        $settings = resolve(SettingsRepositoryInterface::class);

        $reminderIds = $settings->get($remindersKey, []);

        foreach (explode(',', $reminderIds) as $reminderId) {
            $tag = Tag::where('id', trim($reminderId))->first();
            if (!$tag) {
                continue;
            }

            $tag->is_qna = true;
            $tag->qna_reminders = true;
            $tag->save();
        }

        $settings->delete($remindersKey);
    },
    'down' => function (Builder $schema) use ($remindersKey) {
        $tags = Tag::where('qna_reminders', true)->get();

        $ids = [];

        foreach ($tags as $tag) {
            $ids[] = $tag->id;
        }

        /** @var SettingsRepositoryInterface $settings */
        $settings = resolve(SettingsRepositoryInterface::class);

        $settings->set($remindersKey, json_encode($ids));
    },
];
