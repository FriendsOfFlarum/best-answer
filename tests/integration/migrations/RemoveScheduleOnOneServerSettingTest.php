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

class RemoveScheduleOnOneServerSettingTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        $this->setting('fof-best-answer.schedule_on_one_server', '1');
        $this->setting('fof-best-answer.stop_overnight', '1');
    }

    protected function settingExists(string $key): bool
    {
        return $this->database()->table('settings')->where('key', $key)->exists();
    }

    #[Test]
    public function removes_only_the_schedule_on_one_server_setting()
    {
        $this->app();

        $migration = require __DIR__.'/../../../migrations/2026_10_11_000000_remove_schedule_on_one_server_setting.php';
        $migration['up']($this->database()->getSchemaBuilder());

        $this->assertFalse($this->settingExists('fof-best-answer.schedule_on_one_server'));
        $this->assertTrue($this->settingExists('fof-best-answer.stop_overnight'));
    }
}
