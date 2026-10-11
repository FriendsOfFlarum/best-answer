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

use Flarum\Tags\Tag;
use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;

class TagAttributesTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        $this->prepareDatabase([
            Tag::class => [
                ['id' => 1, 'name' => 'Q&A', 'slug' => 'q-a', 'description' => '', 'color' => '#FF0000', 'position' => 0, 'parent_id' => null, 'is_restricted' => false, 'is_hidden' => false, 'is_qna' => true, 'qna_reminders' => true],
                ['id' => 2, 'name' => 'General', 'slug' => 'general', 'description' => '', 'color' => '#00FF00', 'position' => 1, 'parent_id' => null, 'is_restricted' => false, 'is_hidden' => false, 'is_qna' => false, 'qna_reminders' => false],
            ],
        ]);
    }

    #[Test]
    public function tags_expose_qna_and_reminder_flags()
    {
        $response = $this->send($this->request('GET', '/api/tags'));

        $this->assertEquals(200, $response->getStatusCode());

        $attributes = [];

        foreach (json_decode($response->getBody()->getContents(), true)['data'] as $tag) {
            $attributes[$tag['id']] = [$tag['attributes']['isQnA'], $tag['attributes']['reminders']];
        }

        $this->assertEquals(['1' => [true, true], '2' => [false, false]], $attributes);
    }
}
