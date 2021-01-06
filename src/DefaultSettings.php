<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer;

use Flarum\Extend\LifecycleInterface;
use Flarum\Extension\Extension;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Container\Container;

class DefaultSettings implements LifecycleInterface
{
    /**
     * @var SettingsRepositoryInterface
     */
    private $settings;

    public function __construct()
    {
        $this->settings = app('flarum.settings');
    }

    public function onEnable(Container $container, Extension $extension)
    {
        if ($extension->name === 'fof/best-answer') {
            if (($this->settings->get('fof-best-answer.schedule_on_one_server')) === null) {
                $this->settings->set('fof-best-answer.schedule_on_one_server', false);
            }
            if (($this->settings->get('fof-best-answer.stop_overnight')) === null) {
                $this->settings->set('fof-best-answer.stop_overnight', false);
            }
            if (($this->settings->get('fof-best-answer.store_log_output')) === null) {
                $this->settings->set('fof-best-answer.store_log_output', false);
            }
        }
    }

    public function onDisable(Container $container, Extension $extension)
    {
    }

    public function extend(Container $container, Extension $extension = null)
    {
        // TODO: Implement extend() method.
    }
}
