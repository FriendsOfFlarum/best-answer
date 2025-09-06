import SelectBestAnswerItem from '@src/forum/components/SelectBestAnswerItem';

type VNodeLike = { selector?: string | Function; attrs: Record<string, unknown>; children?: any };
type SelectBestAnswerItemLike = {
  oninit: (v: { attrs: { post: { number: () => number }; discussion: unknown } }) => void;
  items: () => { get: (key: string) => VNodeLike | undefined; has: (key: string) => boolean };
  view: () => VNodeLike;
};

describe('SelectBestAnswerItem (additional coverage)', () => {
  test('view returns li with Post--BestAnswer class', () => {
    const comp = new (SelectBestAnswerItem as unknown as { new (): SelectBestAnswerItemLike })();
    comp.oninit({ attrs: { post: { number: () => 2 }, discussion: {} } });
    const vnode = comp.view();
    expect(vnode.selector).toBe('li');
    expect(vnode.attrs.className).toContain('Post--BestAnswer');
  });

  test('adds user item even when bestAnswerSetAt is undefined', () => {
    const comp = new (SelectBestAnswerItem as unknown as { new (): SelectBestAnswerItemLike })();
    const discussion = {
      bestAnswerUser: () => ({ id: () => '2' }),
      bestAnswerSetAt: () => undefined,
    } as const;
    comp.oninit({ attrs: { post: { number: () => 2 }, discussion } });
    const items = comp.items();
    expect(items.has('user')).toBe(true);
  });

  test('does not add user item when bestAnswerUser is missing', () => {
    const comp = new (SelectBestAnswerItem as unknown as { new (): SelectBestAnswerItemLike })();
    const discussion = {
      bestAnswerUser: () => undefined,
      bestAnswerSetAt: () => undefined,
    } as const;
    comp.oninit({ attrs: { post: { number: () => 2 }, discussion } });
    const items = comp.items();
    expect(items.has('user')).toBe(false);
  });
});
