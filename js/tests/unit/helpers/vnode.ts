// Utilities for working with simple Mithril VNodes in tests.
import type m from 'mithril';

// Allow either Mithril VNodes or our lightweight stub objects and strings.
type VLike = m.Vnode<any, any> | { attrs?: { className?: string }; children?: VLike[] } | string | null | undefined;

type MatchedNode = { attrs: any; children?: any };

export function findByClassName(vnode: VLike, cls: string): MatchedNode | undefined {
  if (!vnode) return undefined;
  if (typeof vnode !== 'string' && (vnode as any)?.attrs?.className && String((vnode as any).attrs.className).includes(cls))
    return vnode as unknown as MatchedNode;

  const children: VLike[] = (typeof vnode !== 'string' && ((vnode as any)?.children as VLike[])) || [];
  for (const child of children) {
    const found = findByClassName(child, cls);
    if (found) return found;
  }
  return undefined;
}

export function textContent(vnode: VLike): string {
  if (vnode == null) return '';
  if (typeof vnode === 'string') return vnode;
  const children: VLike[] = ((vnode as any)?.children as VLike[]) || [];
  return children.map((c: VLike) => textContent(c)).join('');
}
