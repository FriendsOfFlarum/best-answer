import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import mq from 'mithril-query';
import { jest } from '@jest/globals';
import Extend from 'flarum/common/extenders';
import Discussion from 'flarum/common/models/Discussion';
import type Tag from 'ext:flarum/tags/common/models/Tag';
import tagsExtend from 'ext:flarum/tags/common/extend';
import extend from '../../../src/forum/extend';
import SolutionSearchSource from '../../../src/forum/components/SolutionSearchSource';

const payload = {
  data: [
    {
      type: 'discussions',
      id: '7',
      attributes: { title: 'Printer jams on duplex', slug: '7-printer-jams-on-duplex' },
      relationships: {
        bestAnswerPost: { data: { type: 'posts', id: '70' } },
        mostRelevantPost: { data: { type: 'posts', id: '71' } },
        tags: { data: [{ type: 'tags', id: '2' }] },
      },
    },
  ],
  included: [
    { type: 'posts', id: '70', attributes: { number: 4, contentType: 'comment', contentHtml: '<p>Clean the rollers first.</p>' } },
    { type: 'posts', id: '71', attributes: { number: 1, contentType: 'comment', contentHtml: '<p>My printer jams every time.</p>' } },
    { type: 'tags', id: '2', attributes: { name: 'Hardware', slug: 'hardware' } },
  ],
};

async function renderResults() {
  jest.spyOn(app, 'request').mockResolvedValue(payload);

  const source = new SolutionSearchSource();
  await source.search('printer', 3);

  return mq({ view: () => <ul>{source.view('printer')}</ul> });
}

beforeAll(() => {
  // jsdom has no innerText, which Post#contentPlain reads.
  Object.defineProperty(HTMLElement.prototype, 'innerText', {
    configurable: true,
    get() {
      return this.textContent;
    },
  });

  bootstrapForum();
  // flarum/tags registers Discussion#tags in its forum extend, which is plain .js Jest cannot load.
  app.bootExtensions({
    'flarum-tags': { extend: [...tagsExtend, new Extend.Model(Discussion).hasMany<Tag>('tags')] },
    'fof-best-answer': { extend },
  });
  app.boot();
});

afterEach(() => jest.restoreAllMocks());

it('shows the best answer excerpt and links each result to the best answer', async () => {
  app.forum.pushAttributes({ showTagsInSearchResults: true });

  const results = await renderResults();

  expect(results.first('.SolutionSearchResult-bestAnswer').textContent).toContain('Clean the rollers first.');
  expect(results.first('.SolutionSearchResult a').getAttribute('href')).toMatch(/\/d\/7-printer-jams-on-duplex\/4$/);
  expect(results).toHaveElementAttr('.SolutionSearchResult', 'data-id', '7');
});

it.each([
  [true, true],
  [false, false],
])('shows the discussion tags only when configured (show tags: %s)', async (showTagsInSearchResults, shown) => {
  app.forum.pushAttributes({ showTagsInSearchResults });

  const results = await renderResults();

  expect(results.contains('Hardware')).toBe(shown);
});
