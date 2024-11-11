<?php

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
