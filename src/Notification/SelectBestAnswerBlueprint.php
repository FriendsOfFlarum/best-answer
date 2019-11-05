<?php

namespace FoF\BestAnswer\Notification;

use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\Discussion\Discussion;

class SelectBestAnswerBlueprint implements BlueprintInterface
{
    public $discussion;

    public function __construct(Discussion $discussion)
    {
        $this->discussion = $discussion;
    }

    /**
     * Get the user that sent the notification.
     */
    public function getFromUser()
    {
        return $this->discussion->user;
    }

    /**
     * Get the model that is the subject of this activity.
     */
    public function getSubject()
    {
        return $this->discussion;
    }

    /**
     * Get the data to be stored in the notification.
     */
    public function getData()
    {
    }

    /**
     * Get the serialized type of this activity.
     *
     * @return string
     */
    public static function getType()
    {
        return 'selectBestAnswer';
    }

    /**
     * Get the name of the model class for the subject of this activity.
     *
     * @return string
     */
    public static function getSubjectModel()
    {
        return Discussion::class;
    }
}
