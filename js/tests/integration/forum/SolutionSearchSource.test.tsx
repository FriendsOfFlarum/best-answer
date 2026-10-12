import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import { jest } from '@jest/globals';
import mq from 'mithril-query';
import tagsExtend from 'ext:flarum/tags/common/extend';
import extend from '../../../src/forum/extend';
import SolutionSearchSource from '../../../src/forum/components/SolutionSearchSource';

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'flarum-tags': { extend: tagsExtend }, 'fof-best-answer': { extend } });
  app.boot();

  app.translator.addTranslations({
    'core.lib.gambits.group_keys.is': 'is',
    'fof-best-answer.lib.gambits.solved-discussions.key': 'solved',
  });
});

function requestedFilter(request: jest.SpiedFunction<typeof app.request>) {
  return (request.mock.calls[0][0] as { params: { filter: Record<string, unknown> } }).params.filter;
}

afterEach(() => jest.restoreAllMocks());

it('only asks the API for solved discussions matching the query', () => {
  const request = jest.spyOn(app, 'request').mockReturnValue(new Promise(() => {}));

  new SolutionSearchSource().search('Printer Jam', 3);

  expect(requestedFilter(request)).toEqual({ q: 'printer jam', 'solved-discussions': true });
});

it('links the full results page to the solved discussions matching the query', () => {
  const link = mq({ view: () => <ul>{new SolutionSearchSource().fullPage('printer')}</ul> });

  const href = decodeURIComponent(link.first('a').getAttribute('href') ?? '');

  expect(href).toContain('q=printer');
  expect(href).toContain('filter[solved-discussions]=true');
});
