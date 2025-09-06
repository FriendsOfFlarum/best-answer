import extendIndexPage from '@src/forum/extenders/extendIndexPage';
import { capturedExts } from 'flarum/common/extend';
import { createItems } from '@helpers/items';

describe('extendIndexPage without newDiscussion', () => {
  test('does not modify items if newDiscussion missing', () => {
    extendIndexPage();
    const e = capturedExts.find((x) => x.method === 'sidebarItems')!;
    const items = createItems();
    e.fn.call({ currentTag: () => ({ isQnA: () => true }) }, items);
    expect(items.has('startDiscussion')).toBe(false);
  });
});
