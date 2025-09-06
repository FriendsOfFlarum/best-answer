import extendSort from '@src/common/addBestAnswerCountSort';
import { lastOverrideMap } from 'flarum/common/extend';

describe('addBestAnswerCountSort', () => {
  test('merges most/least best answers into user directory sort map', () => {
    (global as any).require = (id: string) => (id === '@fof-user-directory' ? { SortMap: function () {} } : undefined);

    // Fake SortMap and adapter
    class SortMap {
      sortMap() {
        return { username: 'username', newest: '-joinedAt' } as any;
      }
    }

    (global as any).require = (id: string) => (id === '@fof-user-directory' ? { SortMap } : undefined);

    extendSort();

    // Emulate calling the overridden method (our stub stores the merged map directly)
    expect(lastOverrideMap).toMatchObject({ most_best_answers: '-bestAnswerCount', least_best_answers: 'bestAnswerCount' });
  });

  test('does nothing when user directory is unavailable', () => {
    const prev = (global as any).require;
    (global as any).require = (_: string) => undefined;
    try {
      // Should not throw
      expect(() => extendSort()).not.toThrow();
    } finally {
      (global as any).require = prev;
    }
  });
});
