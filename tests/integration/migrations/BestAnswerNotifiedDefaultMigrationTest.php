<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Tests\integration\migrations;

use Flarum\Discussion\Discussion;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

class BestAnswerNotifiedDefaultMigrationTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
            ],
            Discussion::class => [
                ['id' => 1, 'user_id' => 2, 'best_answer_notified' => null],
            ],
        ]);
    }

    #[Test]
    public function rolling_back_treats_discussions_not_yet_reminded_as_not_notified()
    {
        $this->app();
        $schema = $this->database()->getSchemaBuilder();

        $migration = require __DIR__.'/../../../migrations/2025_10_17_000000_alter_discussions_set_default_best_answer_notified.php';
        $migration['down']($schema);

        $notified = $this->database()->table('discussions')->where('id', 1)->value('best_answer_notified');

        $migration['up']($schema);

        $this->assertNotNull($notified);
        $this->assertFalse((bool) $notified);
    }
}
