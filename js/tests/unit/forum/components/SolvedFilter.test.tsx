import app from 'flarum/forum/app';
import { jest } from '@jest/globals';
import SolvedFilter from '@src/forum/components/SolvedFilter';

type VNodeLike = { selector?: string | Function; attrs: Record<string, unknown>; children?: any };
type SolvedFilterLike = {
  view: () => VNodeLike | null;
  shouldShowFilter: () => boolean;
  attrs: any;
};

describe('SolvedFilter', () => {
  beforeEach(() => {
    app.discussions.bestAnswer = undefined;
    app.discussions.refresh = jest.fn();
  });

  test('renders when alwaysShow=true', () => {
    const comp = new (SolvedFilter as unknown as { new (): SolvedFilterLike })();
    comp.attrs = { alwaysShow: true };
    const vnode = comp.view() as VNodeLike;
    expect(vnode).toBeTruthy();
    expect(String(vnode.attrs.label)).toContain('translated:fof-best-answer.forum.filter.all_label');
  });

  test('hides and resets when tag is not QnA', () => {
    (app.forum as any).attribute = (k: string) => (k === 'showBestAnswerFilterUi' ? true : undefined);
    app.discussions.bestAnswer = '1';
    app.discussions.refresh = jest.fn();

    const comp = new (SolvedFilter as unknown as { new (): SolvedFilterLike })();
    comp.attrs = { currentTag: { isQnA: () => false } };

    const result = comp.shouldShowFilter();
    expect(result).toBe(false);
    expect(app.discussions.bestAnswer).toBeUndefined();
    expect(app.discussions.refresh).toHaveBeenCalled();
  });

  test('returns null when showBestAnswerFilterUi is disabled', () => {
    (app.forum as any).attribute = (k: string) => (k === 'showBestAnswerFilterUi' ? false : undefined);
    const comp = new (SolvedFilter as unknown as { new (): SolvedFilterLike })();
    comp.attrs = { currentTag: { isQnA: () => true } };
    const vnode = comp.view();
    expect(vnode).toBeNull();
  });

  test('shows solved label when selected=1 and tag is QnA', () => {
    (app.forum as any).attribute = (k: string) => (k === 'showBestAnswerFilterUi' ? true : undefined);
    app.discussions.bestAnswer = '1';
    app.discussions.refresh = jest.fn();

    const comp = new (SolvedFilter as unknown as { new (): SolvedFilterLike })();
    comp.attrs = { currentTag: { isQnA: () => true } };
    const vnode = comp.view() as VNodeLike;

    expect(String(vnode.attrs.label)).toContain('translated:fof-best-answer.forum.filter.solved_label');
  });

  test('shows unsolved label when selected=2 and tag is QnA', () => {
    (app.forum as any).attribute = (k: string) => (k === 'showBestAnswerFilterUi' ? true : undefined);
    app.discussions.bestAnswer = '2';
    app.discussions.refresh = jest.fn();

    const comp = new (SolvedFilter as unknown as { new (): SolvedFilterLike })();
    comp.attrs = { currentTag: { isQnA: () => true } };
    const vnode = comp.view() as VNodeLike;
    expect(String(vnode.attrs.label)).toContain('translated:fof-best-answer.forum.filter.unsolved_label');
  });

  test('defaults to all label when selected is undefined but tag is QnA', () => {
    (app.forum as any).attribute = (k: string) => (k === 'showBestAnswerFilterUi' ? true : undefined);
    app.discussions.refresh = jest.fn();

    const comp: any = new (SolvedFilter as any)();
    comp.attrs = { currentTag: { isQnA: () => true } } as any;
    const vnode = comp.view();
    expect(String(vnode.attrs.label)).toContain('translated:fof-best-answer.forum.filter.all_label');
  });
});
