import app from 'flarum/forum/app';
import BestAnswerInDiscussionNotification from '@src/forum/components/BestAnswerInDiscussionNotification';
import AwardedBestAnswerNotification from '@src/forum/components/AwardedBestAnswerNotification';
import SelectBestAnswerNotification from '@src/forum/components/SelectBestAnswerNotification';

type NotificationLike = {
  attrs: any;
  icon: () => string;
  href: () => string;
  content: () => unknown;
  excerpt: () => unknown;
};

describe('Notification components', () => {
  const discussion = { id: () => '1' } as any;
  const user = { id: () => '2' } as any;
  const mkAttrs = (withUser = false) => ({
    notification: {
      subject: () => discussion,
      fromUser: () => (withUser ? user : null),
    },
  });

  test('BestAnswerInDiscussionNotification exposes icon, href, and content', () => {
    const n = new (BestAnswerInDiscussionNotification as unknown as { new (): NotificationLike })();
    n.attrs = mkAttrs(true);
    expect(n.icon()).toBe('fas fa-check');
    expect(typeof n.href()).toBe('string');
    expect(String(n.content())).toContain('translated:fof-best-answer.forum.notification.best_answer_in_discussion');
    expect(n.excerpt()).toBeNull();
  });

  test('AwardedBestAnswerNotification exposes icon, href, and content', () => {
    const n = new (AwardedBestAnswerNotification as unknown as { new (): NotificationLike })();
    n.attrs = mkAttrs(true);
    expect(n.icon()).toBe('fas fa-check');
    expect(typeof n.href()).toBe('string');
    expect(String(n.content())).toContain('translated:fof-best-answer.forum.notification.awarded');
    expect(n.excerpt()).toBeNull();
  });

  test('SelectBestAnswerNotification exposes icon, href, and content', () => {
    const n = new (SelectBestAnswerNotification as unknown as { new (): NotificationLike })();
    n.attrs = mkAttrs(false);
    expect(n.icon()).toBe('fas fa-comment-dots');
    expect(typeof n.href()).toBe('string');
    expect(String(n.content())).toContain('translated:fof-best-answer.forum.notification.content');
    expect(n.excerpt()).toBeNull();
  });
});
