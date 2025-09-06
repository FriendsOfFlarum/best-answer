import app from 'flarum/forum/app';
import extendDiscussionListState from '@src/forum/extenders/extendDiscussionListState';
import { capturedExts } from 'flarum/common/extend';

describe('extendDiscussionListState', () => {
  test('mutates params for solved filter and query', () => {
    (app as any).discussions = { bestAnswer: '1' };
    extendDiscussionListState();
    const e = capturedExts.find((x) => x.method === 'requestParams')!;
    const params: any = { filter: { q: 'foo' } };
    e.fn.call({}, params);
    expect(params.filter['solved-discussions']).toBe('true');
    expect(params.filter.q).toContain('is:solved');
  });

  test('applies negation when bestAnswer === "2"', () => {
    (app as any).discussions = { bestAnswer: '2' };
    extendDiscussionListState();
    const e = capturedExts.find((x) => x.method === 'requestParams')!;
    const params: any = { filter: { q: 'bar' } };
    e.fn.call({}, params);
    expect(params.filter['-solved-discussions']).toBe('true');
    expect(params.filter.q).toContain('-is:solved');
  });
});
