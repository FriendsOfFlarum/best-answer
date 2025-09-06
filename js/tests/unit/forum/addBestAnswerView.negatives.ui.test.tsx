import addBestAnswerView from '@src/forum/addBestAnswerView';
import { capturedExts } from 'flarum/common/extend';
import { createItems } from '@helpers/items';

describe('addBestAnswerView negatives', () => {
  test('does not add header item when hidden or mismatched id', () => {
    addBestAnswerView();
    const e = capturedExts.find((x) => x.method === 'headerItems')!;

    const itemsHidden = createItems();
    const postHidden = {
      id: () => '42',
      isHidden: () => true,
      discussion: () => ({ hasBestAnswer: () => true, bestAnswerPost: () => ({ id: () => '42' }) }),
    } as any;
    e.fn.call({ attrs: { post: postHidden } }, itemsHidden);
    expect(itemsHidden.has('isBestAnswer')).toBe(false);

    const itemsMismatch = createItems();
    const postMismatch = {
      id: () => '43',
      isHidden: () => false,
      discussion: () => ({ hasBestAnswer: () => true, bestAnswerPost: () => ({ id: () => '42' }) }),
    } as any;
    e.fn.call({ attrs: { post: postMismatch } }, itemsMismatch);
    expect(itemsMismatch.has('isBestAnswer')).toBe(false);
  });

  test('does not add footer preview when no best answer or hidden/first-post constraints fail', () => {
    addBestAnswerView();
    const e = capturedExts.find((x) => x.method === 'footerItems')!;

    const itemsNoBest = createItems();
    const firstNoBest = {
      number: () => 1,
      isHidden: () => false,
      discussion: () => ({ hasBestAnswer: () => false, bestAnswerPost: () => null }),
    } as any;
    e.fn.call({ attrs: { post: firstNoBest } }, itemsNoBest);
    expect(itemsNoBest.has('bestAnswerPost')).toBe(false);

    const itemsHiddenBest = createItems();
    const bestHidden = { number: () => 3, isHidden: () => true } as any;
    const first = {
      number: () => 1,
      isHidden: () => false,
      discussion: () => ({ hasBestAnswer: () => true, bestAnswerPost: () => bestHidden }),
    } as any;
    e.fn.call({ attrs: { post: first } }, itemsHiddenBest);
    expect(itemsHiddenBest.has('bestAnswerPost')).toBe(false);

    const itemsNotFirst = createItems();
    const best = { number: () => 3, isHidden: () => false } as any;
    const notFirst = { number: () => 2, isHidden: () => false, discussion: () => ({ hasBestAnswer: () => true, bestAnswerPost: () => best }) } as any;
    e.fn.call({ attrs: { post: notFirst } }, itemsNotFirst);
    expect(itemsNotFirst.has('bestAnswerPost')).toBe(false);
  });
});
