import { capturedExts } from 'flarum/common/extend';
import { createItems } from '@helpers/items';

// Use moduleNameMapper stubs for Flarum internals

import addAnsweredBadge from '@src/forum/addAnsweredBadge';

describe('addAnsweredBadge', () => {
  test('adds the best answer badge when discussion has a best answer', () => {
    addAnsweredBadge();
    const ext = capturedExts.find((e) => e.method === 'badges');
    expect(ext).toBeTruthy();

    const items = createItems();

    // Simulate a discussion context with a best answer
    ext!.fn.call({ hasBestAnswer: () => true }, items);

    expect(items.has('bestAnswer')).toBe(true);
  });

  test('does not add when hidden badge exists', () => {
    addAnsweredBadge();
    const items = createItems();
    items.add('hidden', true);

    const ext = capturedExts.find((e) => e.method === 'badges')!;
    ext.fn.call({ hasBestAnswer: () => true }, items);
    expect(items.has('bestAnswer')).toBe(false);
  });
});
