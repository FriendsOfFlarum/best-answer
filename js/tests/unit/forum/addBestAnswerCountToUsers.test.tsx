import addBestAnswerCountToUsers from '@src/forum/addBestAnswerCountToUsers';
import { capturedExts } from 'flarum/common/extend';
import { createItems } from '@helpers/items';

describe('addBestAnswerCountToUsers', () => {
  test('adds best-answer-count info item to user card', () => {
    addBestAnswerCountToUsers();
    const e = capturedExts.find((x) => x.method === 'infoItems')!;
    const items = createItems();
    const ctx: any = { attrs: { user: { bestAnswerCount: () => 3 } } };
    e.fn.call(ctx, items);
    expect(items.has('best-answer-count')).toBe(true);
  });
});
