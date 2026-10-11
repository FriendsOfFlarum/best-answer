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

use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;

class BestAnswerColumnIndexesTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');
    }

    #[Test]
    public function best_answer_columns_are_indexed()
    {
        $this->app();
        $schema = $this->database()->getSchemaBuilder();

        $this->assertTrue($schema->hasIndex('discussions', ['best_answer_post_id']));
        $this->assertTrue($schema->hasIndex('discussions', ['best_answer_user_id']));
    }

    #[Test]
    public function rolling_back_removes_only_the_indexes_the_migration_added()
    {
        $this->app();
        $schema = $this->database()->getSchemaBuilder();
        $prefix = $this->database()->getTablePrefix();

        $migration = require __DIR__.'/../../../migrations/2026_10_11_000001_add_indexes_to_best_answer_columns.php';
        $migration['down']($schema);

        $this->assertFalse($schema->hasIndex('discussions', $prefix.'discussions_best_answer_post_id_index'));
        $this->assertFalse($schema->hasIndex('discussions', $prefix.'discussions_best_answer_user_id_index'));
    }
}
