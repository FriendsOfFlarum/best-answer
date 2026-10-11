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
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;

class SaveTagSettingsValidationTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        $this->prepareDatabase([
            Tag::class => [
                ['id' => 1, 'is_qna' => true, 'qna_reminders' => true],
                ['id' => 2, 'is_qna' => false, 'qna_reminders' => false],
            ],
        ]);
    }

    /**
     * @return array<int, array{bool, bool}> is_qna and qna_reminders, keyed by tag id
     */
    protected function tagFlags(): array
    {
        return $this->database()->table('tags')->orderBy('id')->get()
            ->mapWithKeys(fn ($tag) => [$tag->id => [(bool) $tag->is_qna, (bool) $tag->qna_reminders]])
            ->all();
    }

    public static function malformedTagIds(): array
    {
        return [
            'json null'         => ['null'],
            'json object'       => ['{"a":[1]}'],
            'json string'       => ['"x"'],
            'empty json string' => ['""'],
            'nested list'       => ['[[2]]'],
            'not json'          => ['[2'],
        ];
    }

    #[Test]
    #[DataProvider('malformedTagIds')]
    public function malformed_tag_ids_are_rejected_without_changing_any_tag(string $value)
    {
        $response = $this->send(
            $this->request('POST', '/api/settings', [
                'json' => [
                    'fof-best-answer.enabled-tags' => '[2]',
                    'fof-best-answer.remind-tags'  => $value,
                ],
                'authenticatedAs' => 1,
            ])
        );

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertSame(
            '/data/attributes/fof-best-answer.remind-tags',
            json_decode($response->getBody()->getContents(), true)['errors'][0]['source']['pointer']
        );

        $this->assertSame([
            1 => [true, true],
            2 => [false, false],
        ], $this->tagFlags());
    }
}
