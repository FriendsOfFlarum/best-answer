<?php

namespace FoF\BestAnswer;

use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Discussion\Discussion;

class DiscussionAttributes
{
    /**
     * @var BestAnswerRepository
     */
    protected $bestAnswerRepository;
    
    public function __construct(BestAnswerRepository $bestAnswerRepository)
    {
        $this->bestAnswerRepository = $bestAnswerRepository;
    }
    
    public function __invoke(DiscussionSerializer $serializer, Discussion $discussion, array $attributes): array
    {
        $attributes['canSelectBestAnswer'] = $this->bestAnswerRepository->canSelectBestAnswer($serializer->getActor(), $discussion);
        
        return $attributes;
    }
}
