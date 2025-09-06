import app from 'flarum/forum/app';
import extendDiscussionsSearchSource from '@src/forum/extenders/extendDiscussionSearchSource';
import { capturedExts } from 'flarum/common/extend';

describe('extendDiscussionSearchSource', () => {
  test('pushes -is:solved when removeSolutionResultsFromMainSearch is enabled', () => {
    (app.forum as any).attribute = (k: string) => (k === 'removeSolutionResultsFromMainSearch' ? true : undefined);
    extendDiscussionsSearchSource();
    const e = capturedExts.find((x) => x.method === 'queryMutators')!;
    const mutators: string[] = [];
    e.fn.call({}, mutators);
    expect(mutators).toContain('-is:solved');
  });
});
