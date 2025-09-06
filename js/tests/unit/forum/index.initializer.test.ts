import app from 'flarum/forum/app';

describe('forum/index initializer', () => {
  test('registers notifications on init', async () => {
    let captured: any = null;
    (app as any).initializers = { add: (_name: string, cb: any) => (captured = cb) };

    // @ts-ignore - Dynamic import needed for test
    await import('@src/forum/index');
    expect(typeof captured).toBe('function');

    const prev = (global as any).require;
    (global as any).require = (id: string) => (id === '@fof-user-directory' ? { SortMap: function () {} } : undefined);
    try {
      captured();
      // Notifications should be mapped
      expect(app.notificationComponents.selectBestAnswer).toBeTruthy();
      expect(app.notificationComponents.awardedBestAnswer).toBeTruthy();
      expect(app.notificationComponents.bestAnswerInDiscussion).toBeTruthy();
    } finally {
      (global as any).require = prev;
    }
  });
});
