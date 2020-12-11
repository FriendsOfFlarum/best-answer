<?php

namespace FoF\BestAnswer\Console;

use Flarum\Foundation\Paths;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Console\Scheduling\Schedule;

class NotifySchedule
{
    public function __invoke()
    {
        $schedule = app(Schedule::class);
        $settings = app(SettingsRepositoryInterface::class);

        $build = $schedule->command(NotifyCommand::class)
            ->everyMinute()
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
            $build->appendOutputTo($paths->storage . (DIRECTORY_SEPARATOR . 'logs' . DIRECTORY_SEPARATOR . 'fof-best-answer.log'));
        }

        return $schedule;
    }
}
