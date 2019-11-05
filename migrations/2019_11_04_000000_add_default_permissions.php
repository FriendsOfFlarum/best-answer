<?php

use Flarum\Database\Migration;
use Flarum\Group\Group;

return Migration::addPermissions([
    'discussion.selectBestAnswerOwnDiscussion' => Group::MEMBER_ID
]);
