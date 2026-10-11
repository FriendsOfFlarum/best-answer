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

use Flarum\Testing\integration\TestCase;
use Illuminate\Console\Scheduling\Event;
use Illuminate\Console\Scheduling\Schedule;
use PHPUnit\Framework\Attributes\Test;

class NotifyScheduleTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');
    }

    protected function notifyEvent(): Event
    {
        $events = $this->app()->getContainer()->make(Schedule::class)->events();

        foreach ($events as $event) {
            if (str_contains((string) $event->command, 'fof:best-answer:notify')) {
                return $event;
            }
        }

        $this->fail('fof:best-answer:notify is not scheduled');
    }

    #[Test]
    public function reminder_task_runs_on_one_server_only()
    {
        $this->assertTrue($this->notifyEvent()->onOneServer);
    }
}
