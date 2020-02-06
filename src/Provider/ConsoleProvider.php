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

use FoF\Console\Providers\ConsoleProvider as Console;
use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\BestAnswer\Console\NotifyCommand;
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

            if ((bool) $settings->get('fof-best-answer.schedule-on-one-server', false)) {
                $build->onOneServer();
            }

            if ((bool) $settings->get('fof-best-answer.stop-overnight', false)) {
                $build->unlessBetween('21:00', '8:00');
            }

            if ((bool) $settings->get('fof-best-answer.store-log-output', true)) {
                $build->appendOutputTo(storage_path('logs'.DIRECTORY_SEPARATOR.'fof-best-answer.log'));
            }
        });
    }
}
