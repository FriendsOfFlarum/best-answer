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

class DefaultFilterOptionSettingMigrationTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        $this->setting('fof-best-answer.show_filter_dropdown', '0');
    }

    #[Test]
    public function keeps_an_existing_filter_dropdown_setting()
    {
        $this->app();

        $migration = require __DIR__.'/../../../migrations/2021_09_10_add_default_filter_option_setting.php';
        $migration['up']($this->database()->getSchemaBuilder());

        $this->assertSame(
            '0',
            $this->database()->table('settings')->where('key', 'fof-best-answer.show_filter_dropdown')->value('value')
        );
    }
}
