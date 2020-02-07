<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Provider;

use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\BestAnswer\Console\NotifyCommand;
use FoF\Console\Providers\ConsoleProvider as Console;
use Illuminate\Console\Scheduling\Schedule;

class ConsoleProvider extends AbstractServiceProvider
{
    public function register()
    {
        if (!defined('ARTISAN_BINARY')) {
            define('ARTISAN_BINARY', 'flarum');
        }

        // Force registering the Schedule as singleton.

        $this->app->register(Console::class);

        $this->app->resolving(Schedule::class, function (Schedule $schedule) {
            $settings = $this->app->make(SettingsRepositoryInterface::class);

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
                $build->appendOutputTo(storage_path('logs'.DIRECTORY_SEPARATOR.'fof-best-answer.log'));
            }
        });
    }
}
