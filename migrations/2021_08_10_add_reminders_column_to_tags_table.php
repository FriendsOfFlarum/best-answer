<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Flarum\Database\Migration;

return Migration::addColumns('tags', [
    'qna_reminders' => ['boolean', 'default' => false, 'nullable' => false],
]);
