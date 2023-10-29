<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\tests\unit;

use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\Notification\NotificationSyncer;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Testing\unit\TestCase;
use Flarum\User\User;
use FoF\BestAnswer\BestAnswerRepository;
use FoF\BestAnswer\Listeners\SaveBestAnswerToDatabase;
use FoF\BestAnswer\Notification\SelectBestAnswerBlueprint;
use Illuminate\Events\Dispatcher;
use Mockery as m;
use Symfony\Contracts\Translation\TranslatorInterface;

class SaveBestAnswerToDatabaseTest extends TestCase
{
    /**
     * @var m\MockInterface|SaveBestAnswerToDatabase
     */
    protected $sut;  // System Under Test

    public function tearDown(): void
    {
        m::close();
        parent::tearDown();
    }

    // testing the `handle()` method

    public function testHandle_WhenKeyIsMissing_ReturnsWithoutAction()
    {
        $event = m::mock(Saving::class);
        $event->data = [];

        $this->sut = m::mock(SaveBestAnswerToDatabase::class.'[removeBestAnswer,setBestAnswer]', [
            m::mock(NotificationSyncer::class),
            m::mock(Dispatcher::class),
            m::mock(TranslatorInterface::class),
            m::mock(BestAnswerRepository::class),
            m::mock(SettingsRepositoryInterface::class),
        ])->shouldAllowMockingProtectedMethods();

        $this->sut->shouldNotReceive('removeBestAnswer');
        $this->sut->shouldNotReceive('setBestAnswer');

        $this->sut->handle($event);
    }

    public function testHandle_DiscussionDoesNotExistOrMatches_ReturnsWithoutAction()
    {
        $event = m::mock(Saving::class);
        $event->data = ['attributes.bestAnswerPostId' => 1];
        $event->discussion = m::mock(Discussion::class)->makePartial();
        $event->actor = m::mock(User::class);

        $event->discussion->exists = false;
        $event->discussion->best_answer_post_id = 1;

        $this->sut = m::mock(SaveBestAnswerToDatabase::class.'[removeBestAnswer,setBestAnswer]', [
            m::mock(NotificationSyncer::class),
            m::mock(Dispatcher::class),
            m::mock(TranslatorInterface::class),
            m::mock(BestAnswerRepository::class),
            m::mock(SettingsRepositoryInterface::class),
        ])->shouldAllowMockingProtectedMethods();

        $this->sut->shouldNotReceive('removeBestAnswer');
        $this->sut->shouldNotReceive('setBestAnswer');

        $this->sut->handle($event);
    }

    public function testHandle_IdIsZero_CallsRemoveBestAnswer()
    {
        $event = m::mock(Saving::class);
        $event->data = ['attributes.bestAnswerPostId' => 0];
        $event->discussion = m::mock(Discussion::class)->makePartial();
        $event->actor = m::mock(User::class);

        $event->discussion->exists = true;
        $event->discussion->best_answer_post_id = 1;

        $notifications = m::mock(NotificationSyncer::class);
        $notifications->shouldReceive('delete')->with(m::type(SelectBestAnswerBlueprint::class))->once();

        $this->sut = m::mock(SaveBestAnswerToDatabase::class.'[removeBestAnswer]', [
            $notifications,
            m::mock(Dispatcher::class),
            m::mock(TranslatorInterface::class),
            m::mock(BestAnswerRepository::class),
            m::mock(SettingsRepositoryInterface::class),
        ])->shouldAllowMockingProtectedMethods();

        $this->sut->shouldReceive('removeBestAnswer')->once();

        $this->sut->handle($event);
    }

    public function testHandle_IdIsNotZero_CallsSetBestAnswer()
    {
        $event = m::mock(Saving::class);
        $event->data = ['attributes.bestAnswerPostId' => 2];
        $event->discussion = m::mock(Discussion::class)->makePartial();
        $event->actor = m::mock(User::class);

        $event->discussion->exists = true;
        $event->discussion->best_answer_post_id = 1;

        $notifications = m::mock(NotificationSyncer::class);
        $notifications->shouldReceive('delete')->with(m::type(SelectBestAnswerBlueprint::class))->once();

        $this->sut = m::mock(SaveBestAnswerToDatabase::class.'[setBestAnswer]', [
            $notifications,
            m::mock(Dispatcher::class),
            m::mock(TranslatorInterface::class),
            m::mock(BestAnswerRepository::class),
            m::mock(SettingsRepositoryInterface::class),
        ])->shouldAllowMockingProtectedMethods();

        $this->sut->shouldReceive('setBestAnswer')->once();

        $this->sut->handle($event);
    }
}
