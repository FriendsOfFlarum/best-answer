import extendDiscussionComposer from '@src/forum/extenders/extendDiscussionComposer';
import { capturedExts } from 'flarum/common/extend';
import { createItems } from '@helpers/items';

describe('extendDiscussionComposer guards', () => {
  beforeEach(() => {
    // Ensure we install extender once per suite
    (capturedExts as any).length = 0;
    extendDiscussionComposer();
  });

  test('does nothing when tags are undefined', () => {
    const e = capturedExts.find((x) => x.method === 'headerItems')!;
    const items = createItems();
    items.set('discussionTitle', { children: '' });

    const composerCtx: any = {
      composer: { fields: {} },
      attrs: { disabled: false },
      title: () => '',
      onkeydown: () => {},
    };

    e.fn.call(composerCtx, items);
    expect(items.get('discussionTitle').selector).not.toBe('h3');
  });

  test('does nothing when no QnA tags present', () => {
    const e = capturedExts.find((x) => x.method === 'headerItems')!;
    const items = createItems();
    items.set('discussionTitle', { children: '' });

    const composerCtx: any = {
      composer: { fields: { tags: [{ isQnA: () => false }] } },
      attrs: { disabled: false },
      title: () => '',
      onkeydown: () => {},
    };

    e.fn.call(composerCtx, items);
    expect(items.get('discussionTitle').selector).not.toBe('h3');
  });
});
