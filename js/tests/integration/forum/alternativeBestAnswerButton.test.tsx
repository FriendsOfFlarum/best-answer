import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import CommentPost from 'flarum/forum/components/CommentPost';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import PageState from 'flarum/common/states/PageState';
import type Post from 'flarum/common/models/Post';
import mq from 'mithril-query';
import extend from '../../../src/forum/extend';
import addBestAnswerAction from '../../../src/forum/addBestAnswerAction';

function answer(id: string, number: number) {
  return {
    type: 'posts',
    id,
    attributes: {
      number,
      contentType: 'comment',
      contentHtml: '<p>Use the forgot password link.</p>',
      createdAt: '2026-10-01T10:00:00Z',
      canSelectAsBestAnswer: true,
    },
    relationships: { discussion: { data: { type: 'discussions', id: '1' } }, user: { data: { type: 'users', id: '2' } } },
  };
}

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'fof-best-answer': { extend } });
  app.boot();
  addBestAnswerAction();

  app.forum.pushAttributes({ useAlternativeBestAnswerUi: true });
  app.current = new PageState(DiscussionPage);

  app.store.pushPayload({
    data: {
      type: 'discussions',
      id: '1',
      attributes: { title: 'How do I reset my password?', slug: '1-how-do-i-reset-my-password' },
      relationships: { user: { data: { type: 'users', id: '1' } } },
    },
    included: [{ type: 'users', id: '2', attributes: { username: 'answerer', displayName: 'answerer' } }, answer('2', 2), answer('3', 3)],
  });
});

it('highlights the best answer button while the discussion has no best answer', () => {
  const post = mq(CommentPost, { post: app.store.getById<Post>('posts', '2') });

  expect(post).toHaveElement('.item-bestAnswer .Button--primary');
});

it('tones down the best answer button on other posts once a best answer is selected', () => {
  app.store.pushPayload({
    data: {
      type: 'discussions',
      id: '1',
      attributes: { hasBestAnswer: 3 },
      relationships: { bestAnswerPost: { data: { type: 'posts', id: '3' } } },
    },
  });

  const post = mq(CommentPost, { post: app.store.getById<Post>('posts', '2') });

  expect(post).toHaveElement('.item-bestAnswer .Button--link');
  expect(post).not.toHaveElement('.item-bestAnswer .Button--primary');
});
