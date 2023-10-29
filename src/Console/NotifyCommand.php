<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Console;

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Notification\NotificationSyncer;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Tag;
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
        $canSelectOwn = (bool) (int) $this->settings->get('fof-best-answer.allow_select_own_post');
        $time = Carbon::now()->subDays($days);

        // set a max time period to go back, so we don't spam really old discussions too.
        $timeLimit = Carbon::now()->subDays(7 + $days);

        if ($days <= 0) {
            $this->info('Reminders are disabled');

            return;
        }

        $this->info('Looking at discussions before '.$time->toDateTimeString().' but not older than '.$timeLimit->toDateTimeString());

        $tags = Tag::where('qna_reminders', true)->pluck('id');
        $query = Discussion::query()
            ->leftJoin('discussion_tag', 'discussion_tag.discussion_id', '=', 'discussions.id')
            ->whereIn('discussion_tag.tag_id', $tags)
            ->whereNull('discussions.best_answer_post_id')
            ->whereNull('discussions.hidden_at')
            ->where('discussions.best_answer_notified', false)
            ->where('discussions.comment_count', '>', 1)
            ->where('discussions.is_private', 0)
            ->whereDate('discussions.created_at', '<', $time->toIso8601String())
            ->whereDate('discussions.created_at', '>', $timeLimit->toIso8601String());

        $count = $query->count();

        if ($count == 0) {
            $this->info('Nothing to do');

            return;
        }

        $errors = [];

        $query->chunkById(20, function ($discussions) use ($canSelectOwn, &$errors) {
            // Filter out discussions where the user can't select a post as best answer.
            // - The user must have permission to select a best answer on their own discussion
            // - The user must be able to select a post, whether they can select any post (including their own) or not.
            $discussions = $discussions->filter(function ($d) use ($canSelectOwn) {
                $hasPermission = $d->user->can('selectBestAnswerOwnDiscussion', $d);
                $canSelectPosts = $canSelectOwn || $d->posts()->where('user_id', '!=', $d->user_id)->count() != 0;

                return $hasPermission && $canSelectPosts;
            });

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
