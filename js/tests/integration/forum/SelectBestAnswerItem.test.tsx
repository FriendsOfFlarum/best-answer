import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import type Discussion from 'flarum/common/models/Discussion';
import type User from 'flarum/common/models/User';
import mq from 'mithril-query';
import extend from '../../../src/forum/extend';
import SelectBestAnswerItem from '../../../src/forum/components/SelectBestAnswerItem';

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'fof-best-answer': { extend } });
  app.boot();
  app.translator.addTranslations({ 'fof-best-answer.forum.best_answer_label': 'set by <a>{username}</a> {time_set}' });

  app.store.pushPayload({
    data: {
      type: 'discussions',
      id: '1',
      attributes: { title: 'How do I reset my password?', slug: '1-how-do-i-reset-my-password', hasBestAnswer: 2 },
      relationships: {
        bestAnswerPost: { data: { type: 'posts', id: '2' } },
        bestAnswerUser: { data: { type: 'users', id: '3' } },
      },
    },
    included: [
      { type: 'users', id: '3', attributes: { username: 'moderator', displayName: 'moderator', slug: 'moderator' } },
      {
        type: 'posts',
        id: '2',
        attributes: { number: 2, contentType: 'comment', contentHtml: '<p>Use the forgot password link.</p>', createdAt: '2026-10-01T10:00:00Z' },
        relationships: { discussion: { data: { type: 'discussions', id: '1' } } },
      },
    ],
  });
});

it('links the user who selected the best answer to their profile', () => {
  const discussion = app.store.getById<Discussion>('discussions', '1')!;
  const user = app.store.getById<User>('users', '3')!;

  const item = mq(SelectBestAnswerItem, { post: discussion.bestAnswerPost(), discussion });
  const link = item.first('.BestAnswer--User a');

  expect(link.textContent).toBe('moderator');
  expect(link.getAttribute('href')).toBe(m.route.prefix + app.route.user(user));
});
