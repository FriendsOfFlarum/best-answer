<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Listeners;

use Flarum\Foundation\ValidationException;
use Flarum\Settings\Event\Saving;
use Flarum\Tags\Tag;
use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\Arr;

class SaveTagSettings
{
    public function __construct(
        protected Factory $validation,
    ) {
    }

    public function handle(Saving $event): void
    {
        $enabledTagIds = $this->tagIds($event->settings, 'fof-best-answer.enabled-tags');
        $enabledReminderIds = $this->tagIds($event->settings, 'fof-best-answer.remind-tags');

        if ($enabledTagIds !== null) {
            Tag::query()->whereIn('id', $enabledTagIds)->update(['is_qna' => true]);
            Tag::query()->whereNotIn('id', $enabledTagIds)->update(['is_qna' => false]);
        }

        if ($enabledReminderIds !== null) {
            Tag::query()->whereIn('id', $enabledReminderIds)->update(['qna_reminders' => true]);
            Tag::query()->whereNotIn('id', $enabledReminderIds)->update(['qna_reminders' => false]);
        }
    }

    /**
     * @return array<int|string>|null
     */
    protected function tagIds(array $settings, string $key): ?array
    {
        if (!$value = Arr::get($settings, $key)) {
            return null;
        }

        $tagIds = is_string($value) ? json_decode($value) : null;

        // Validation rules skip empty strings, so anything but a JSON list goes in as null to fail `array`.
        $validator = $this->validation->make(
            ['tags' => is_array($tagIds) ? $tagIds : null],
            ['tags' => ['array'], 'tags.*' => ['integer']],
            [],
            ['tags' => $key, 'tags.*' => $key]
        );

        if ($validator->fails()) {
            throw new ValidationException([$key => $validator->errors()->first()]);
        }

        return $tagIds;
    }
}
