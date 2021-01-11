<?php

namespace FoF\BestAnswer\Listeners;

use Flarum\Event\ConfigureDiscussionGambits;
use FoF\BestAnswer\Gambit\IsSolvedGambit;
use FoF\BestAnswer\Gambit\IsUnsolvedGambit;

class AddGambits
{
    public function handle(ConfigureDiscussionGambits $event)
    {
        $event->gambits->add(IsSolvedGambit::class);
        $event->gambits->add(IsUnsolvedGambit::class);
    }
}
