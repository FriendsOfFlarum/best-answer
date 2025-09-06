import app from 'flarum/forum/app';
import extendSearch from '@src/forum/extenders/extendSearch';
import { capturedExts } from 'flarum/common/extend';
import { createItems } from '@helpers/items';

describe('extendSearch', () => {
  test('adds solution search source only when enabled', () => {
    // Enabled
    (app.forum as any).attribute = (k: string) => (k === 'solutionSearchEnabled' ? true : undefined);
    extendSearch();
    const e = capturedExts.find((x) => x.method === 'sourceItems')!;
    const itemsEn = createItems();
    e.fn.call({}, itemsEn);
    expect(itemsEn.map.has('solution')).toBe(true);

    // Disabled
    (app.forum as any).attribute = () => false;
    const itemsDis = createItems();
    e.fn.call({}, itemsDis);
    expect(itemsDis.map.has('solution')).toBe(false);
  });
});
