import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import DiscussionListState from 'flarum/forum/states/DiscussionListState';
import extendDiscussionListState from '../../../src/forum/extenders/extendDiscussionListState';

beforeAll(() => {
  bootstrapForum();
  app.boot();
  extendDiscussionListState();
});

afterEach(() => {
  app.discussions.bestAnswer = undefined;
});

it('narrows a search to solved discussions with the filter, leaving the search text alone', () => {
  app.discussions.bestAnswer = '1';

  const params = new DiscussionListState({ q: 'password' }).requestParams();

  expect(params.filter).toEqual({ q: 'password', 'solved-discussions': 'true' });
});

it('narrows a search to unsolved discussions with the negated filter, leaving the search text alone', () => {
  app.discussions.bestAnswer = '2';

  const params = new DiscussionListState({ q: 'password' }).requestParams();

  expect(params.filter).toEqual({ q: 'password', '-solved-discussions': 'true' });
});
