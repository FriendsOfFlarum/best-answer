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
use Flarum\Testing\unit\TestCase;
use Flarum\User\User;
use FoF\BestAnswer\Listeners\SaveBestAnswerToDatabase;
use FoF\BestAnswer\Notification\SelectBestAnswerBlueprint;
use FoF\BestAnswer\Repository\BestAnswerRepository;
use Mockery as m;

class SaveBestAnswerToDatabaseTest extends TestCase
{
    /**
     * @var SaveBestAnswerToDatabase
     */
    protected $sut;  // System Under Test

    public function tearDown(): void
    {
        m::close();
        parent::tearDown();
    }

    public function testHandle_WhenKeyIsMissing_ReturnsWithoutAction()
    {
        $event = m::mock(Saving::class);
        $event->data = [];

        $notifications = m::mock(NotificationSyncer::class);
        $repository = m::mock(BestAnswerRepository::class);

        $this->sut = new SaveBestAnswerToDatabase($notifications, $repository);

        $result = $this->sut->handle($event);

        // Assert that no actions were taken
        $this->assertNull($result);
    }

    public function testHandle_DiscussionDoesNotExistOrMatches_ReturnsWithoutAction()
    {
        $event = m::mock(Saving::class);
        $event->data = ['attributes.bestAnswerPostId' => 1];
        $event->discussion = m::mock(Discussion::class)->makePartial();
        $event->actor = m::mock(User::class);

        $event->discussion->exists = false;
        $event->discussion->best_answer_post_id = 1;

        $notifications = m::mock(NotificationSyncer::class);
        $repository = m::mock(BestAnswerRepository::class);

        $this->sut = new SaveBestAnswerToDatabase($notifications, $repository);

        $result = $this->sut->handle($event);

        // Assert that no actions were taken
        $this->assertNull($result);
    }

    public function testHandle_IdIsZero_CallsHandleRemoveBestAnswer()
    {
        $event = m::mock(Saving::class);
        $event->data = ['attributes.bestAnswerPostId' => 0];
        $event->discussion = m::mock(Discussion::class)->makePartial();
        $event->actor = m::mock(User::class);

        $event->discussion->exists = true;
        $event->discussion->best_answer_post_id = 1;

        $notifications = m::mock(NotificationSyncer::class);
        $notifications->shouldReceive('delete')->with(m::type(SelectBestAnswerBlueprint::class))->once();

        $repository = m::mock(BestAnswerRepository::class);
        $repository->shouldReceive('canRemoveBestAnswer')->with($event->actor, $event->discussion)->andReturn(true);
        $repository->shouldReceive('removeBestAnswer')->with($event->discussion, $event->actor, 0)->once();

        $this->sut = new SaveBestAnswerToDatabase($notifications, $repository);

        $this->sut->handle($event);
    }

    public function testHandle_IdIsNotZero_CallsHandleSetBestAnswer()
    {
        $event = m::mock(Saving::class);
        $event->data = ['attributes.bestAnswerPostId' => 2];
        $event->discussion = m::mock(Discussion::class)->makePartial();
        $event->actor = m::mock(User::class);

        $event->discussion->exists = true;
        $event->discussion->best_answer_post_id = 1;

        $notifications = m::mock(NotificationSyncer::class);
        $notifications->shouldReceive('delete')->with(m::type(SelectBestAnswerBlueprint::class))->once();

        $repository = m::mock(BestAnswerRepository::class);
        $repository->shouldReceive('canSelectPostAsBestAnswer')->with($event->actor, m::type(Discussion::class))->andReturn(true);
        $repository->shouldReceive('setBestAnswer')->with($event->discussion, $event->actor, 2)->once();

        $this->sut = new SaveBestAnswerToDatabase($notifications, $repository);

        $this->sut->handle($event);
    }
}
