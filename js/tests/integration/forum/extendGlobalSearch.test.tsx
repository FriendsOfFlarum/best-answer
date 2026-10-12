import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import GlobalSearch from 'flarum/forum/components/GlobalSearch';
import GlobalDiscussionsSearchSource from 'flarum/forum/components/GlobalDiscussionsSearchSource';
import tagsExtend from 'ext:flarum/tags/common/extend';
import extend from '../../../src/forum/extend';
import extendGlobalSearch from '../../../src/forum/extenders/extendGlobalSearch';
import SolutionSearchSource from '../../../src/forum/components/SolutionSearchSource';

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'flarum-tags': { extend: tagsExtend }, 'fof-best-answer': { extend } });
  app.boot();
  extendGlobalSearch();
});

it.each([
  [true, true],
  [false, false],
])('registers the solutions search source only when solution search is enabled (enabled: %s)', (solutionSearchEnabled, registered) => {
  app.forum.pushAttributes({ solutionSearchEnabled });

  const sources = GlobalSearch.prototype.sourceItems().toArray();

  expect(sources.some((source) => source instanceof SolutionSearchSource)).toBe(registered);
});

it('leaves the discussions source as the default tab of the search modal', () => {
  app.forum.pushAttributes({ solutionSearchEnabled: true, canViewForum: true });

  const sources = GlobalSearch.prototype.sourceItems().toArray();

  expect(sources[0]).toBeInstanceOf(GlobalDiscussionsSearchSource);
});
