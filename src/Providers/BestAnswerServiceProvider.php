<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Providers;

use Flarum\Foundation\AbstractServiceProvider;
use FoF\BestAnswer\Repository\BestAnswerRepository;

class BestAnswerServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->container->bind(BestAnswerRepository::class);
    }
}
