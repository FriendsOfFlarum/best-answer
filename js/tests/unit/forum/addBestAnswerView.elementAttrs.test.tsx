import addBestAnswerView from '@src/forum/addBestAnswerView';
import { capturedExts } from 'flarum/common/extend';

describe('addBestAnswerView elementAttrs', () => {
  test('adds Post--bestAnswer class when post is best answer', () => {
    addBestAnswerView();
    const e = capturedExts.find((x) => x.method === 'elementAttrs')!;
    const attrs: any = { className: 'Post' };
    const post = {
      isHidden: () => false,
      id: () => '42',
      discussion: () => ({ hasBestAnswer: () => true, bestAnswerPost: () => ({ id: () => '42' }) }),
    } as any;
    e.fn.call({ attrs: { post } }, attrs);
    expect(attrs.className).toContain('Post--bestAnswer');
  });

  test('sets className when initially missing', () => {
    addBestAnswerView();
    const e = capturedExts.find((x) => x.method === 'elementAttrs')!;
    const attrs: any = {};
    const post = {
      isHidden: () => false,
      id: () => '7',
      discussion: () => ({ hasBestAnswer: () => true, bestAnswerPost: () => ({ id: () => '7', isHidden: () => false }) }),
    } as any;
    e.fn.call({ attrs: { post } }, attrs);
    expect(attrs.className).toBe('Post--bestAnswer');
  });
});
