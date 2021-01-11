<?php

namespace FoF\BestAnswer\Listeners;

use Flarum\Event\ConfigureDiscussionGambits;
use FoF\BestAnswer\Gambit\IsSolvedGambit;

class AddGambits
{
    public function handle(ConfigureDiscussionGambits $event)
    {
        $event->gambits->add(IsSolvedGambit::class);
    }
}
