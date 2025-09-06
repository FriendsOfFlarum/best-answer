import SelectBestAnswerItem from '@src/forum/components/SelectBestAnswerItem';

type VNodeLike = { selector?: string | Function; attrs: Record<string, unknown>; children?: any };
type SelectBestAnswerItemLike = {
  oninit: (v: { attrs: { post: { number: () => number }; discussion: unknown } }) => void;
  items: () => { get: (key: string) => VNodeLike | undefined };
};

describe('SelectBestAnswerItem', () => {
  test('includes user info when bestAnswerUser exists', () => {
    const comp = new (SelectBestAnswerItem as unknown as { new (): SelectBestAnswerItemLike })();
    const discussion = {
      bestAnswerUser: () => ({ id: () => '2' }),
      bestAnswerSetAt: () => new Date(),
    } as const;
    comp.oninit({ attrs: { post: { number: () => 2 }, discussion } });
    const items = comp.items();
    const userItem = items.get('user');
    expect(userItem?.attrs?.className).toContain('BestAnswer--User');
  });
});
