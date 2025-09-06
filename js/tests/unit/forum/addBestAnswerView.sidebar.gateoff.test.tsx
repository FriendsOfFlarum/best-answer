import app from 'flarum/forum/app';
import addBestAnswerView from '@src/forum/addBestAnswerView';
import { capturedExts } from 'flarum/common/extend';
import { createItems } from '@helpers/items';

describe('addBestAnswerView sidebar gate off', () => {
  test('does not add jump button when forum setting disabled', () => {
    (app.forum as any).attribute = () => false;
    addBestAnswerView();
    const e = capturedExts.find((x) => x.method === 'sidebarItems')!;
    const items = createItems();
    const post = { number: () => 3, isHidden: () => false } as any;
    const discussion = { hasBestAnswer: () => true, bestAnswerPost: () => post } as any;
    e.fn.call({ discussion }, items);
    expect(items.has('jumpToBestAnswer')).toBe(false);
  });
});
