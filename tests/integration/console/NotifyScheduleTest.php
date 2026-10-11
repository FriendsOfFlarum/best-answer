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

use Carbon\Carbon;
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

    public function tearDown(): void
    {
        Carbon::setTestNow();

        parent::tearDown();
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

    /**
     * The overnight window is read when the schedule is defined, so the clock is set before the app boots.
     */
    protected function reminderTaskRunsAt(string $time): bool
    {
        Carbon::setTestNow(Carbon::parse("2026-10-11 $time"));

        return $this->notifyEvent()->filtersPass($this->app()->getContainer());
    }

    #[Test]
    public function reminder_task_runs_overnight_by_default()
    {
        $this->assertTrue($this->reminderTaskRunsAt('03:00'));
    }

    #[Test]
    public function reminder_task_skips_overnight_when_stop_overnight_is_enabled()
    {
        $this->setting('fof-best-answer.stop_overnight', true);

        $this->assertFalse($this->reminderTaskRunsAt('03:00'));
    }

    #[Test]
    public function reminder_task_runs_during_the_day_when_stop_overnight_is_enabled()
    {
        $this->setting('fof-best-answer.stop_overnight', true);

        $this->assertTrue($this->reminderTaskRunsAt('12:00'));
    }
}
