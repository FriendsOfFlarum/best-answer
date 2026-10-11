import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import DiscussionListState from 'flarum/forum/states/DiscussionListState';
import tagsExtend from 'ext:flarum/tags/common/extend';
import extend from '../../../src/forum/extend';
import extendDiscussionListState from '../../../src/forum/extenders/extendDiscussionListState';

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'flarum-tags': { extend: tagsExtend }, 'fof-best-answer': { extend } });
  app.boot();
  extendDiscussionListState();

  app.store.pushPayload({
    data: [
      { type: 'tags', id: '1', attributes: { name: 'Q&A', slug: 'q-a', isQnA: true } },
      { type: 'tags', id: '2', attributes: { name: 'General', slug: 'general', isQnA: false } },
    ],
  });
});

afterEach(() => {
  app.discussions.bestAnswer = undefined;
});

function filterFor(params: { q?: string; tags?: string }) {
  return new DiscussionListState(params).requestParams().filter;
}

it('narrows a Q&A tag search to solved discussions, leaving the search text alone', () => {
  app.discussions.bestAnswer = '1';

  expect(filterFor({ q: 'password', tags: 'q-a' })).toEqual({ q: 'password', 'solved-discussions': 'true' });
});

it('narrows a Q&A tag search to unsolved discussions, leaving the search text alone', () => {
  app.discussions.bestAnswer = '2';

  expect(filterFor({ q: 'password', tags: 'q-a' })).toEqual({ q: 'password', '-solved-discussions': 'true' });
});

it('does not carry the solved filter over to All Discussions', () => {
  app.discussions.bestAnswer = '1';

  expect(filterFor({})).toEqual({});
});

it('does not apply the solved filter to a tag without best answers', () => {
  app.discussions.bestAnswer = '1';

  expect(filterFor({ tags: 'general' })).toEqual({});
});
