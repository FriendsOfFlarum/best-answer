<?php

/*
 * This file is part of fof/best-answer.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\BestAnswer\Api\Controller;

use Flarum\Extension\ExtensionManager;
use Flarum\Http\RequestUtil;
use Flarum\Tags\Tag;
use Laminas\Diactoros\Response\EmptyResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class FeatureEnableController implements RequestHandlerInterface
{
    const functions = ['enableAllTags', 'enableAllReminders'];

    private $extensions;

    public function __construct(ExtensionManager $extensions)
    {
        $this->extensions = $extensions;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        RequestUtil::getActor($request)->assertAdmin();

        $body = json_decode($request->getBody()->getContents());

        if (in_array($body->feature, self::functions)) {
            $this->{$body->feature}();
        }

        return new EmptyResponse();
    }

    private function tagsInstalledAndEnabled(): bool
    {
        return $this->extensions->isEnabled('flarum-tags') && class_exists(Tag::class);
    }

    private function enableAllTags(): void
    {
        if (!$this->tagsInstalledAndEnabled()) {
            return;
        }

        Tag::chunk(10, function ($tags) {
            foreach ($tags as $tag) {
                /** @var Tag $tag */
                $tag->is_qna = true;
                $tag->save();
            }
        });
    }

    private function enableAllReminders(): void
    {
        if (!$this->tagsInstalledAndEnabled()) {
            return;
        }

        Tag::chunk(10, function ($tags) {
            foreach ($tags as $tag) {
                /** @var Tag $tag */
                $tag->qna_reminders = true;
                $tag->save();
            }
        });
    }
}
