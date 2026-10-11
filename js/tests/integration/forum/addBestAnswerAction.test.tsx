import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import CommentPost from 'flarum/forum/components/CommentPost';
import type Post from 'flarum/common/models/Post';
import mq from 'mithril-query';
import extend from '../../../src/forum/extend';
import addBestAnswerAction from '../../../src/forum/addBestAnswerAction';

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'fof-best-answer': { extend } });
  app.boot();
  addBestAnswerAction();

  app.store.pushPayload({
    data: {
      type: 'discussions',
      id: '1',
      attributes: { title: 'How do I reset my password?', slug: '1-how-do-i-reset-my-password' },
      relationships: { user: { data: { type: 'users', id: '1' } } },
    },
    included: [
      { type: 'users', id: '1', attributes: { username: 'asker', displayName: 'asker' } },
      { type: 'users', id: '2', attributes: { username: 'answerer', displayName: 'answerer' } },
      {
        type: 'posts',
        id: '2',
        attributes: { number: 2, contentType: 'comment', contentHtml: '<p>Use the forgot password link.</p>', createdAt: '2026-10-01T10:00:00Z' },
        relationships: { discussion: { data: { type: 'discussions', id: '1' } }, user: { data: { type: 'users', id: '2' } } },
      },
    ],
  });
});

// Core skips redrawing a post until its freshness changes, so rendering must not change it.
function freshnessAfterRendering(useAlternativeBestAnswerUi: boolean): number {
  app.forum.pushAttributes({ useAlternativeBestAnswerUi });

  const post = app.store.getById<Post>('posts', '2')!;
  post.freshness = new Date(0);

  mq(CommentPost, { post }).redraw();

  return post.freshness.getTime();
}

it('does not mark a post as changed when rendering it with the default layout', () => {
  expect(freshnessAfterRendering(false)).toBe(0);
});

it('does not mark a post as changed when rendering it with the alternative layout', () => {
  expect(freshnessAfterRendering(true)).toBe(0);
});
