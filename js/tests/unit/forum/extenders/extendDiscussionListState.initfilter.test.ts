import app from 'flarum/forum/app';
import extendDiscussionListState from '@src/forum/extenders/extendDiscussionListState';
import { capturedExts } from 'flarum/common/extend';

describe('extendDiscussionListState (filter init)', () => {
  test('initializes params.filter when absent', () => {
    (app as any).discussions = { bestAnswer: '1' };
    extendDiscussionListState();
    const e = capturedExts.find((x) => x.method === 'requestParams')!;
    const params: any = {};
    e.fn.call({}, params);
    expect(params.filter['solved-discussions']).toBe('true');
  });
});
