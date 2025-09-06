import app from 'flarum/forum/app';
import { jest } from '@jest/globals';
import SolvedFilter from '@src/forum/components/SolvedFilter';

type VNodeLike = { selector?: string | Function; attrs: Record<string, any>; children?: any };
type SolvedFilterLike = {
  view: () => VNodeLike | null;
  attrs: any;
};

describe('SolvedFilter clicks', () => {
  beforeEach(() => {
    (app.forum as any).attribute = (k: string) => (k === 'showBestAnswerFilterUi' ? true : undefined);
    app.discussions.refresh = jest.fn();
    app.discussions.bestAnswer = undefined;
  });

  test('clicking "all" (value 0) removes bestAnswer and refreshes', () => {
    // Arrange: current tag is QnA so filter renders
    const comp = new (SolvedFilter as unknown as { new (): SolvedFilterLike })();
    comp.attrs = { currentTag: { isQnA: () => true } };

    const vnode = comp.view() as VNodeLike;
    // Dropdown stub receives a single array argument as children
    const first = vnode.children[0][0];

    // Pre-set a value so we can verify delete branch
    app.discussions.bestAnswer = '1';

    // Act: invoke the button click handler
    first.attrs.onclick();

    // Assert: the filter is cleared and list refreshed
    expect(app.discussions.bestAnswer).toBeUndefined();
    expect(app.discussions.refresh).toHaveBeenCalled();
  });

  test('clicking "unsolved" (value 2) sets filter and refreshes without delete', () => {
    // Arrange: current tag is QnA so filter renders
    const comp = new (SolvedFilter as unknown as { new (): SolvedFilterLike })();
    comp.attrs = { currentTag: { isQnA: () => true } };

    const vnode = comp.view() as VNodeLike;
    const third = vnode.children[0][2]; // value === '2' -> unsolved

    // No pre-existing filter
    app.discussions.bestAnswer = undefined;
    (app.discussions.refresh as jest.Mock).mockClear();

    // Act
    third.attrs.onclick();

    // Assert: sets bestAnswer to '2' and refreshes
    expect(app.discussions.bestAnswer).toBe('2');
    expect(app.discussions.refresh).toHaveBeenCalled();
  });
});
