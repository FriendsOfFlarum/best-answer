<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Console;

use Flarum\Foundation\Paths;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Console\Scheduling\Event;

class NotifySchedule
{
    /**
     * @var SettingsRepositoryInterface
     */
    public $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(Event $event)
    {
        $event->hourly()
            ->withoutOverlapping();

        if ((bool) $this->settings->get('fof-best-answer.schedule_on_one_server')) {
            $event->onOneServer();
        }

        if ((bool) $this->settings->get('fof-best-answer.stop_overnight')) {
            $event->between('8:00', '21:00');
            //TODO expose times back to config options
        }

        if ((bool) $this->settings->get('fof-best-answer.store_log_output')) {
            $paths = resolve(Paths::class);
            $event->appendOutputTo($paths->storage.(DIRECTORY_SEPARATOR.'logs'.DIRECTORY_SEPARATOR.'fof-best-answer.log'));
        }
    }
}
