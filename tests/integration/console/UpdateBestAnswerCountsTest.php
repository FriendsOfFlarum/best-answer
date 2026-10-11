<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Tests\integration\console;

use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\Testing\integration\ConsoleTestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

class UpdateBestAnswerCountsTest extends ConsoleTestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        // User 3 wrote two best answers and user 4 one; every stored count starts out wrong.
        $this->prepareDatabase([
            User::class => [
                ['id' => 2, 'best_answer_count' => 5],
                ['id' => 3, 'best_answer_count' => 0],
                ['id' => 4, 'best_answer_count' => null],
            ],
            Discussion::class => [
                ['id' => 1, 'user_id' => 2, 'best_answer_post_id' => 2],
                ['id' => 2, 'user_id' => 2, 'best_answer_post_id' => 4],
                ['id' => 3, 'user_id' => 2, 'best_answer_post_id' => 6],
                ['id' => 4, 'user_id' => 2],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'number' => 1, 'user_id' => 2],
                ['id' => 2, 'discussion_id' => 1, 'number' => 2, 'user_id' => 3],
                ['id' => 3, 'discussion_id' => 2, 'number' => 1, 'user_id' => 2],
                ['id' => 4, 'discussion_id' => 2, 'number' => 2, 'user_id' => 3],
                ['id' => 5, 'discussion_id' => 3, 'number' => 1, 'user_id' => 2],
                ['id' => 6, 'discussion_id' => 3, 'number' => 2, 'user_id' => 4],
                ['id' => 7, 'discussion_id' => 4, 'number' => 1, 'user_id' => 2],
                ['id' => 8, 'discussion_id' => 4, 'number' => 2, 'user_id' => 4],
            ],
        ]);
    }

    #[Test]
    public function recalculates_every_users_best_answer_count()
    {
        $this->runCommand(['command' => 'fof:best-answer:update-counts']);

        $this->assertSame(
            [2 => 0, 3 => 2, 4 => 1],
            User::query()->whereIn('id', [2, 3, 4])->orderBy('id')->pluck('best_answer_count', 'id')->all()
        );
    }
}
