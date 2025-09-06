import app from 'flarum/forum/app';
import extendIndexPage from '@src/forum/extenders/extendIndexPage';
import { capturedExts } from 'flarum/common/extend';
import { createItems } from '@helpers/items';

describe('extendIndexPage', () => {
  beforeEach(() => {
    // default: logged in
    (app.session as any).user = { id: () => '1' } as any;
  });

  test('updates CTA label to ask_question when can start discussion', () => {
    (app.forum as any).attribute = (k: string) => (k === 'canStartDiscussion' ? true : undefined);
    extendIndexPage();
    const e = capturedExts.find((x) => x.method === 'sidebarItems')!;

    const items = createItems();
    items.set('newDiscussion', { children: '' });
    items.set('startDiscussion', { children: '' });

    e.fn.call({ currentTag: () => ({ isQnA: () => true }) }, items);

    const cta = items.get('startDiscussion');
    expect(String(cta.children)).toContain('translated:fof-best-answer.forum.index.ask_question');
  });

  test('updates CTA label to cannot_ask_question when cannot start', () => {
    // Logged in and canStartDiscussion is false => cannot ask
    (app.forum as any).attribute = (k: string) => (k === 'canStartDiscussion' ? false : undefined);
    extendIndexPage();
    const e = capturedExts.find((x) => x.method === 'sidebarItems')!;

    const items = createItems();
    items.set('newDiscussion', { children: '' });
    items.set('startDiscussion', { children: '' });

    e.fn.call({ currentTag: () => ({ isQnA: () => true }) }, items);

    const cta = items.get('startDiscussion');
    expect(String(cta.children)).toContain('translated:fof-best-answer.forum.index.cannot_ask_question');
  });

  test('adds solved filter component to view items when current tag exists', () => {
    extendIndexPage();
    const e = capturedExts.find((x) => x.method === 'viewItems')!;
    const items = createItems();
    e.fn.call({ currentTag: () => ({}) }, items);
    expect(items.has('solved-filter')).toBe(true);
  });
});
