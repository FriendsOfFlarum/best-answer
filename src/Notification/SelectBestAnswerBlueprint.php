<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Notification;

use Flarum\Discussion\Discussion;
use Flarum\Notification\AlertableInterface;
use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\Notification\MailableInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class SelectBestAnswerBlueprint implements BlueprintInterface, AlertableInterface, MailableInterface
{
    public $discussion;

    public function __construct(Discussion $discussion)
    {
        $this->discussion = $discussion;
    }

    /**
     * Get the user that sent the notification.
     */
    public function getFromUser(): ?\Flarum\User\User
    {
        return $this->discussion->user;
    }

    /**
     * Get the model that is the subject of this activity.
     */
    public function getSubject(): ?\Flarum\Database\AbstractModel
    {
        return $this->discussion;
    }

    /**
     * Get the data to be stored in the notification.
     */
    public function getData(): mixed
    {
        return [];
    }

    /**
     * Get the serialized type of this activity.
     *
     * @return string
     */
    public static function getType(): string
    {
        return 'selectBestAnswer';
    }

    /**
     * Get the name of the model class for the subject of this activity.
     *
     * @return string
     */
    public static function getSubjectModel(): string
    {
        return Discussion::class;
    }

    /**
     * Get the name of the view to construct a notification email with.
     *
     * @return array{text?: string, html?: string}
     */
    public function getEmailViews(): array
    {
        return ['text' => 'fof-best-answer::emails.selectBestAnswer'];
    }

    /**
     * Get the subject line for a notification email.
     *
     * @return string
     */
    public function getEmailSubject(\Flarum\Locale\TranslatorInterface $translator): string
    {
        return $translator->trans('fof-best-answer.email.subject.select', [
            '{discussion_title}' => $this->discussion->title,
        ]);
    }
}
