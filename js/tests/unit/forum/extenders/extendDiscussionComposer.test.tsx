import extendDiscussionComposer from '@src/forum/extenders/extendDiscussionComposer';
import { capturedExts } from 'flarum/common/extend';
import { createItems } from '@helpers/items';

describe('extendDiscussionComposer', () => {
  test('replaces discussionTitle content for QnA tags', () => {
    extendDiscussionComposer();
    const e = capturedExts.find((x) => x.method === 'headerItems')!;

    const items = createItems();
    items.set('discussionTitle', { children: '' });
    const composerCtx: any = {
      composer: { fields: { tags: [{ isQnA: () => true }] } },
      attrs: { disabled: false },
      title: () => '',
      onkeydown: () => {},
    };

    e.fn.call(composerCtx, items);
    const vnode = items.get('discussionTitle');
    expect(vnode.selector).toBe('h3');
  });
});
