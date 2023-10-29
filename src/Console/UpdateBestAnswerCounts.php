<?php

namespace FoF\BestAnswer\Console;

use Flarum\User\User;
use FoF\BestAnswer\BestAnswerRepository;
use Illuminate\Console\Command;

class UpdateBestAnswerCounts extends Command
{
    /**
     * @var BestAnswerRepository
     */
    public $bestAnswers;
    
    public function __construct(BestAnswerRepository $bestAnswers)
    {
        parent::__construct();
        $this->bestAnswers = $bestAnswers;
    }
    
    /**
     * @var string
     */
    protected $signature = 'fof:best-answer:update-counts';

    /**
     * @var string
     */
    protected $description = 'Update best answer counts for all users';

    public function handle()
    {
        $this->info('Updating best answer counts...');

        $userCount = User::count();

        $bar = $this->output->createProgressBar($userCount);

        User::query()->chunkById(100, function ($users) use ($bar) {
            foreach ($users as $user) {
                $user->best_answer_count = $this->bestAnswers->calculateBestAnswersForUser($user);
                $user->save();

                $bar->advance();
            }
        });

        $bar->finish();

        $this->info('Done!');
    }
}
