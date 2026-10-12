<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Tests\integration\api;

use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;

class SearchForumAttributesTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');
    }

    /**
     * @return array<string, mixed>
     */
    protected function searchAttributes(): array
    {
        $response = $this->send($this->request('GET', '/api'));

        $this->assertEquals(200, $response->getStatusCode());

        $attributes = json_decode($response->getBody()->getContents(), true)['data']['attributes'];

        return [
            'solutionSearchEnabled'               => $attributes['solutionSearchEnabled'] ?? null,
            'removeSolutionResultsFromMainSearch' => $attributes['removeSolutionResultsFromMainSearch'] ?? null,
            'showTagsInSearchResults'             => $attributes['showTagsInSearchResults'] ?? null,
        ];
    }

    #[Test]
    public function search_settings_default_to_solution_search_with_tags_and_main_search_untouched()
    {
        $this->assertSame([
            'solutionSearchEnabled'               => true,
            'removeSolutionResultsFromMainSearch' => false,
            'showTagsInSearchResults'             => true,
        ], $this->searchAttributes());
    }

    #[Test]
    public function search_settings_reflect_the_stored_values()
    {
        $this->setting('fof-best-answer.search.remove_solutions_from_main_search', '1');
        $this->setting('fof-best-answer.search.display_tags', '0');

        $this->assertSame([
            'solutionSearchEnabled'               => true,
            'removeSolutionResultsFromMainSearch' => true,
            'showTagsInSearchResults'             => false,
        ], $this->searchAttributes());
    }

    #[Test]
    public function solutions_stay_in_the_main_search_while_solution_search_is_off()
    {
        $this->setting('fof-best-answer.search.solution_search', '0');
        $this->setting('fof-best-answer.search.remove_solutions_from_main_search', '1');

        $this->assertFalse($this->searchAttributes()['removeSolutionResultsFromMainSearch']);
    }
}
