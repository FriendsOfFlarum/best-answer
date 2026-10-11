import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import CommentPost from 'flarum/forum/components/CommentPost';
import type Post from 'flarum/common/models/Post';
import mq from 'mithril-query';
import extend from '../../../src/forum/extend';
import addBestAnswerView from '../../../src/forum/addBestAnswerView';

function post(id: string, number: number, userId: string, contentHtml: string) {
  return {
    type: 'posts',
    id,
    attributes: { number, contentType: 'comment', contentHtml, createdAt: '2026-10-01T10:00:00Z' },
    relationships: {
      discussion: { data: { type: 'discussions', id: '1' } },
      user: { data: { type: 'users', id: userId } },
    },
  };
}

function user(id: string, username: string) {
  return { type: 'users', id, attributes: { username, displayName: username } };
}

function selectBestAnswer(postId: string) {
  app.store.pushPayload({
    data: {
      type: 'discussions',
      id: '1',
      attributes: { hasBestAnswer: Number(postId) },
      relationships: { bestAnswerPost: { data: { type: 'posts', id: postId } } },
    },
  });
}

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'fof-best-answer': { extend } });
  app.boot();
  addBestAnswerView();

  app.store.pushPayload({
    data: {
      type: 'discussions',
      id: '1',
      attributes: { title: 'How do I reset my password?', slug: '1-how-do-i-reset-my-password' },
      relationships: { user: { data: { type: 'users', id: '1' } } },
    },
    included: [
      user('1', 'asker'),
      user('2', 'first_answerer'),
      user('3', 'second_answerer'),
      post('1', 1, '1', '<p>How do I reset my password?</p>'),
      post('2', 2, '2', '<p>Use the forgot password link.</p>'),
      post('3', 3, '3', '<p>Ask an admin to send a reset email.</p>'),
    ],
  });
});

it('shows the newly selected best answer on the first post without a reload', () => {
  selectBestAnswer('2');

  const firstPost = mq(CommentPost, { post: app.store.getById<Post>('posts', '1') });

  expect(firstPost).toContainRaw('Use the forgot password link.');

  selectBestAnswer('3');
  firstPost.redraw();

  expect(firstPost).toContainRaw('Ask an admin to send a reset email.');
  expect(firstPost).not.toContainRaw('Use the forgot password link.');
});

it('removes the preview from the first post while the best answer is being unselected', () => {
  selectBestAnswer('2');

  const firstPost = mq(CommentPost, { post: app.store.getById<Post>('posts', '1') });

  expect(firstPost).toContainRaw('Use the forgot password link.');

  // Model.save() applies the relationship change before the response arrives, so hasBestAnswer is still set here.
  app.store.getById('discussions', '1')!.pushData({ relationships: { bestAnswerPost: { data: null } } });
  firstPost.redraw();

  expect(firstPost).not.toContainRaw('Use the forgot password link.');
});
