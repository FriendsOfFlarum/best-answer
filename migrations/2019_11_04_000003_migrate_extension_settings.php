<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Flarum\Group\Group;
use Flarum\Group\Permission;
use Illuminate\Database\Schema\Builder;

$permissionKey = 'discussion.selectBestAnswerOwnDiscussion';

return [
    'up' => function (Builder $schema) use ($permissionKey) {
        $db = $schema->getConnection();

        foreach (['allow_select_own_post', 'select_best_answer_reminder_days'] as $setting) {
            $db->table('settings')
                ->where('key', "flarum-best-answer.$setting")
                ->update(['key' => "fof-best-answer.$setting"]);
        }

        $permission = $db->table('group_permission')
            ->where('permission', 'discussion.selectBestAnswer');

        if (!Permission::query()->where('permission', $permissionKey)->exists()) {
            if ($permission->exists()) {
                $permission->update([
                    'permission' => $permissionKey,
                ]);
            } else {
                $db->table('group_permission')->insert([
                    'group_id'   => Group::MEMBER_ID,
                    'permission' => $permissionKey,
                ]);
            }
        }
    },
    'down' => function (Builder $schema) use ($permissionKey) {
        $db = $schema->getConnection();

        $db->table('group_permission')->where('permission', $permissionKey)->delete();
    },
];
