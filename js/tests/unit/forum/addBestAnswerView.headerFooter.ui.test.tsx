import addBestAnswerView from '@src/forum/addBestAnswerView';
import { capturedExts } from 'flarum/common/extend';
import { createItems } from '@helpers/items';

describe('addBestAnswerView header/footer', () => {
  test('adds isBestAnswer item in header when post matches best answer', () => {
    addBestAnswerView();
    const e = capturedExts.find((x) => x.method === 'headerItems')!;
    const items = createItems();
    const post = {
      id: () => '42',
      isHidden: () => false,
      discussion: () => ({ hasBestAnswer: () => true, bestAnswerPost: () => ({ id: () => '42' }) }),
    } as any;
    e.fn.call({ attrs: { post } }, items);
    expect(items.has('isBestAnswer')).toBe(true);
  });

  test('adds footer preview item when first post and best answer exists', () => {
    addBestAnswerView();
    const e = capturedExts.find((x) => x.method === 'footerItems')!;
    const items = createItems();
    const best = { number: () => 3, isHidden: () => false, user: () => ({}) } as any;
    const first = { number: () => 1, isHidden: () => false, discussion: () => ({ hasBestAnswer: () => true, bestAnswerPost: () => best }) } as any;
    e.fn.call({ attrs: { post: first } }, items);
    expect(items.has('bestAnswerPost')).toBe(true);
  });
});
