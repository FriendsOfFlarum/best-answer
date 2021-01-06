<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Console;

use Flarum\Foundation\Paths;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Console\Scheduling\Schedule;

class NotifySchedule
{
    public function __invoke(Schedule $schedule)
    {
        $settings = app(SettingsRepositoryInterface::class);

        $build = $schedule->command(NotifyCommand::class)
            ->hourly()
            ->withoutOverlapping();

        if ((bool) $settings->get('fof-best-answer.schedule_on_one_server')) {
            $build->onOneServer();
        }

        if ((bool) $settings->get('fof-best-answer.stop_overnight')) {
            $build->between('8:00', '21:00');
            //TODO expose times back to config options
        }

        if ((bool) $settings->get('fof-best-answer.store_log_output')) {
            $paths = app(Paths::class);
            $build->appendOutputTo($paths->storage.(DIRECTORY_SEPARATOR.'logs'.DIRECTORY_SEPARATOR.'fof-best-answer.log'));
        }

        return $schedule;
    }
}
