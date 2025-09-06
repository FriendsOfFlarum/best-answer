import extendIndexPage from '@src/forum/extenders/extendIndexPage';
import { capturedExts } from 'flarum/common/extend';
import { createItems } from '@helpers/items';

describe('extendIndexPage early returns', () => {
  test('sidebarItems: returns early when tag is not QnA', () => {
    extendIndexPage();
    const e = capturedExts.find((x) => x.method === 'sidebarItems')!;
    const items = createItems();
    items.set('newDiscussion', { children: '' });
    items.set('startDiscussion', { children: '' });
    e.fn.call({ currentTag: () => ({ isQnA: () => false }) }, items);
    // unchanged
    expect(items.get('startDiscussion').children).toBe('');
  });

  test('viewItems: returns early when currentTag is undefined', () => {
    extendIndexPage();
    const e = capturedExts.find((x) => x.method === 'viewItems')!;
    const items = createItems();
    e.fn.call({ currentTag: () => undefined }, items);
    expect(items.has('solved-filter')).toBe(false);
  });
});
