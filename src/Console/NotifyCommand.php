<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Console;

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Notification\NotificationSyncer;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\BestAnswer\Notification\SelectBestAnswerBlueprint;
use Illuminate\Console\Command;
use Throwable;

class NotifyCommand extends Command
{
    /**
     * @var SettingsRepositoryInterface
     */
    private $settings;

    /**
     * @var NotificationSyncer
     */
    private $notifications;

    public function __construct(SettingsRepositoryInterface $settings, NotificationSyncer $notifications)
    {
        parent::__construct();

        $this->settings = $settings;
        $this->notifications = $notifications;
    }

    /**
     * @var string
     */
    protected $signature = 'fof:best-answer:notify';

    /**
     * @var string
     */
    protected $description = 'After a configurable number of days, notifies OP of discussions with no post selected as best answer to select one.';

    public function handle()
    {
        $days = (int) $this->settings->get('fof-best-answer.select_best_answer_reminder_days');
        $time = Carbon::today()->addDay(-$days);

        if ($days <= 0) {
            $this->info('Reminders are disabled');

            return;
        }

        $this->info('Looking at discussions before '.$time->toDateString());

        $query = Discussion::query()
            ->whereNull('best_answer_post_id')
            ->where('best_answer_notified', false)
            ->where('comment_count', '>', 1)
            ->whereDate('created_at', '<', $time);

        $count = $query->count();

        if ($count == 0) {
            $this->info('Nothing to do');

            return;
        }

        $errors = [];

        $query->chunk(20, function ($discussions) use (&$errors) {
            /*
             * @var $discussions Discussion[]
             */
            $this->output->write('<info>Sending '.count($discussions).' notifications </info>');

            foreach ($discussions as $d) {
                try {
                    $this->notifications->sync(
                        new SelectBestAnswerBlueprint($d),
                        [$d->user]
                    );

                    $this->output->write('<info>#</info>');

                    $d->best_answer_notified = true;
                    $d->save();
                } catch (Throwable $e) {
                    $this->output->write('<error>#</error>');
                    $errors[] = $e;
                }
            }

            $this->line('');
        });

        if (count($errors) > 0) {
            $this->line("\n");
            $this->alert('Failed to send '.count($errors).' notifications');
            $this->warn('');

            foreach ($errors as $i => $e) {
                $n = $i + 1;

                $this->output->writeln("<warning>$n >>>>>></warning> <error>$e</error>");
                $this->line('');
            }
        }
    }
}
