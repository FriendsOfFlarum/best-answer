import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import GlobalDiscussionsSearchSource from 'flarum/forum/components/GlobalDiscussionsSearchSource';
import { jest } from '@jest/globals';
import tagsExtend from 'ext:flarum/tags/common/extend';
import extend from '../../../src/forum/extend';
import extendGlobalDiscussionsSearchSource from '../../../src/forum/extenders/extendGlobalDiscussionsSearchSource';

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'flarum-tags': { extend: tagsExtend }, 'fof-best-answer': { extend } });
  app.boot();
  extendGlobalDiscussionsSearchSource();

  app.translator.addTranslations({
    'core.lib.gambits.group_keys.is': 'is',
    'fof-best-answer.lib.gambits.solved-discussions.key': 'solved',
  });
});

afterEach(() => jest.restoreAllMocks());

it.each([
  [true, { q: 'printer jam', '-solved-discussions': true }],
  [false, { q: 'printer jam' }],
])('excludes solved discussions from the main discussion search only when configured (remove: %s)', (removeSolutionResultsFromMainSearch, filter) => {
  app.forum.pushAttributes({ removeSolutionResultsFromMainSearch });
  const request = jest.spyOn(app, 'request').mockReturnValue(new Promise(() => {}));

  new GlobalDiscussionsSearchSource().search('Printer Jam', 3);

  expect((request.mock.calls[0][0] as { params: { filter: Record<string, unknown> } }).params.filter).toEqual(filter);
});

it('still shows the results under the query the user typed when solved discussions are excluded', async () => {
  app.forum.pushAttributes({ removeSolutionResultsFromMainSearch: true });
  const request = jest.spyOn(app, 'request').mockResolvedValue({
    data: [{ type: 'discussions', id: '7', attributes: { title: 'Printer jams on duplex' } }],
  });

  const source = new GlobalDiscussionsSearchSource();
  await source.search('Printer Jam', 3);

  expect(source.isCached('Printer Jam')).toBe(true);
  expect(source.view('Printer Jam').map((vnode) => vnode.attrs['data-id'])).toEqual(['7']);
});
