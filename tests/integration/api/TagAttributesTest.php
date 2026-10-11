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
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;

class TagAttributesTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-tags', 'fof-best-answer');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
            ],
            Tag::class => [
                ['id' => 1, 'name' => 'Q&A', 'slug' => 'q-a', 'description' => '', 'color' => '#FF0000', 'position' => 0, 'parent_id' => null, 'is_restricted' => false, 'is_hidden' => false, 'is_qna' => true, 'qna_reminders' => true],
                ['id' => 2, 'name' => 'General', 'slug' => 'general', 'description' => '', 'color' => '#00FF00', 'position' => 1, 'parent_id' => null, 'is_restricted' => false, 'is_hidden' => false, 'is_qna' => false, 'qna_reminders' => false],
            ],
        ]);
    }

    /**
     * @return array<string, array<string, mixed>> tag attributes, keyed by tag id
     */
    protected function tagAttributes(?int $actorId): array
    {
        $response = $this->send($this->request('GET', '/api/tags', $actorId ? ['authenticatedAs' => $actorId] : []));

        $this->assertEquals(200, $response->getStatusCode());

        $attributes = [];

        foreach (json_decode($response->getBody()->getContents(), true)['data'] as $tag) {
            $attributes[$tag['id']] = $tag['attributes'];
        }

        ksort($attributes);

        return $attributes;
    }

    #[Test]
    public function admins_see_the_qna_and_reminder_flags()
    {
        $flags = array_map(
            fn (array $tag) => [$tag['isQnA'], $tag['qnaReminders'] ?? null],
            $this->tagAttributes(1)
        );

        $this->assertSame(['1' => [true, true], '2' => [false, false]], $flags);
    }

    public static function nonAdminActors(): array
    {
        return [
            'guest'  => [null],
            'member' => [2],
        ];
    }

    #[Test]
    #[DataProvider('nonAdminActors')]
    public function non_admins_see_the_qna_flag_but_not_the_reminder_flag(?int $actorId)
    {
        $attributes = $this->tagAttributes($actorId);

        $this->assertSame(['1' => true, '2' => false], array_map(fn (array $tag) => $tag['isQnA'], $attributes));

        foreach ($attributes as $tag) {
            $this->assertArrayNotHasKey('qnaReminders', $tag);
            $this->assertArrayNotHasKey('reminders', $tag);
        }
    }
}
