<?php

namespace FoF\BestAnswer\Listeners;

use Flarum\Settings\Event\Saving;
use Flarum\Tags\Tag;
use Illuminate\Support\Arr;

class SaveTagSettings
{
    public function handle(Saving $event): void
    {
        $settings = $event->settings;

        if ($enabledTagIds = Arr::get($settings, 'fof-best-answer.enabled-tags')) {
            $enabledTagIds = json_decode($enabledTagIds);
            Tag::query()->whereIn('id', $enabledTagIds)->update(['is_qna' => true]);
            Tag::query()->whereNotIn('id', $enabledTagIds)->update(['is_qna' => false]);
        }

        if ($reminderTagIds = Arr::get($settings, 'fof-best-answer.remind-tags')) {
            $enabledReminderIds = json_decode($reminderTagIds);
            Tag::query()->whereIn('id', $enabledReminderIds)->update(['qna_reminders' => true]);
            Tag::query()->whereNotIn('id', $enabledReminderIds)->update(['qna_reminders' => false]);
        }
    }
}
