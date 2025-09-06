import extendNotifications from '@src/forum/extenders/extendNotifications';
import { capturedExts } from 'flarum/common/extend';
import { createItems } from '@helpers/items';

describe('extendNotifications', () => {
  test('adds three notification types to grid', () => {
    extendNotifications();
    const e = capturedExts.find((x) => x.method === 'notificationTypes')!;

    const items = createItems();

    e.fn.call({}, items);

    expect(items.has('awardedBestAnswer')).toBe(true);
    expect(items.has('bestAnswerInDiscussion')).toBe(true);
    expect(items.has('selectBestAnswer')).toBe(true);
  });
});
