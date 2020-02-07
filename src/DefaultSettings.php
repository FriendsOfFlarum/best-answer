<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
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
            if (($this->settings->get('fof-best-answer.schedule-on-one-server')) === null) {
                $this->settings->set('fof-best-answer.schedule-on-one-server', false);
            }
            if (($this->settings->get('fof-best-answer.stop-overnight')) === null) {
                $this->settings->set('fof-best-answer.stop-overnight', false);
            }
            if (($this->settings->get('fof-best-answer.store-log-output')) === null) {
                $this->settings->set('fof-best-answer.store-log-output', true);
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
