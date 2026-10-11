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

class SaveTagSettingsTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        $this->prepareDatabase([
            Tag::class => [
                ['id' => 1, 'is_qna' => true, 'qna_reminders' => true],
                ['id' => 2, 'is_qna' => false, 'qna_reminders' => false],
                ['id' => 3, 'is_qna' => false, 'qna_reminders' => false],
            ],
        ]);
    }

    /**
     * @return array<string, array{bool, bool}> isQnA and reminders, keyed by tag id
     */
    protected function tagFlags(): array
    {
        $response = $this->send($this->request('GET', '/api/tags'));

        $flags = [];

        foreach (json_decode($response->getBody()->getContents(), true)['data'] as $tag) {
            $flags[$tag['id']] = [$tag['attributes']['isQnA'], $tag['attributes']['reminders']];
        }

        ksort($flags);

        return $flags;
    }

    #[Test]
    public function saving_the_tag_settings_updates_qna_and_reminder_flags()
    {
        $response = $this->send(
            $this->request('POST', '/api/settings', [
                'json' => [
                    'fof-best-answer.enabled-tags' => '[2,3]',
                    'fof-best-answer.remind-tags'  => '[3]',
                ],
                'authenticatedAs' => 1,
            ])
        );

        $this->assertEquals(204, $response->getStatusCode());

        $this->assertSame([
            '1' => [false, false],
            '2' => [true, false],
            '3' => [true, true],
        ], $this->tagFlags());
    }
}
