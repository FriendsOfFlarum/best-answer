import app from 'flarum/forum/app';
import BestAnswerFooterPreview from '@src/forum/components/BestAnswerFooterPreview';
import { findByClassName } from '@helpers/vnode';
import { jest } from '@jest/globals';

type VNodeLike = { selector?: string | Function; attrs: Record<string, unknown>; children?: any };
type BestAnswerFooterPreviewLike = {
  oninit: (v: unknown) => void;
  view: () => VNodeLike;
};

function buildComp(maxLines: number): BestAnswerFooterPreviewLike {
  (app.forum as any).attribute = (key: string) => (key === 'fof-best-answer.show_max_lines' ? maxLines : undefined);

  const comp = new (BestAnswerFooterPreview as unknown as { new (): BestAnswerFooterPreviewLike })();
  comp.oninit({
    attrs: {
      user: {},
      post: { number: () => 2, contentHtml: () => '<p>hello</p>', createdAt: () => new Date(), isHidden: () => false },
      discussion: {},
    },
  });
  return comp;
}

describe('BestAnswerFooterPreview', () => {
  test('adds truncate class when max lines > 0', () => {
    const comp = buildComp(3);
    const vnode = comp.view();
    const body = findByClassName(vnode, 'Post-body');
    expect(body?.attrs.className).toContain('Post-body--truncate');
    expect(body?.attrs.style['--max-lines']).toBe(3);
  });

  test('does not add truncate class when max lines <= 0', () => {
    const comp = buildComp(0);
    const vnode = comp.view();
    const body = findByClassName(vnode, 'Post-body');
    expect(body?.attrs.className).not.toContain('Post-body--truncate');
  });

  test('container onclick jumps to post number', () => {
    const comp = buildComp(1);
    const goToNumber = jest.fn();
    (app.current as any) = { get: () => ({ goToNumber }) } as any;
    const vnode = comp.view();
    (vnode as any).attrs.onclick();
    expect(goToNumber).toHaveBeenCalledWith(2);
  });
});
