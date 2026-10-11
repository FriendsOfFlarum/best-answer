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

use Flarum\Discussion\Discussion;
use Flarum\User\User;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;

class UpdateBestAnswerCounts extends Command
{
    /**
     * @var string
     */
    protected $signature = 'fof:best-answer:update-counts';

    /**
     * @var string
     */
    protected $description = 'Update best answer counts for all users';

    public function handle(): int
    {
        $this->info('Updating best answer counts...');

        $bar = $this->output->createProgressBar(User::count());

        // Per chunk: one grouped count, one reset, and one write per user who has best answers.
        User::query()->select('id')->chunkById(1000, function (Collection $users) use ($bar) {
            $ids = $users->pluck('id')->all();

            $counts = Discussion::query()
                ->join('posts', 'posts.id', '=', 'discussions.best_answer_post_id')
                ->whereIn('posts.user_id', $ids)
                ->groupBy('posts.user_id')
                ->select('posts.user_id')
                ->selectRaw('count(*) as best_answers')
                ->pluck('best_answers', 'user_id');

            User::query()->whereIn('id', $ids)->update(['best_answer_count' => 0]);

            foreach ($counts as $userId => $count) {
                User::query()->whereKey($userId)->update(['best_answer_count' => $count]);
            }

            $bar->advance($users->count());
        });

        $bar->finish();

        $this->info('Done!');

        return self::SUCCESS;
    }
}
