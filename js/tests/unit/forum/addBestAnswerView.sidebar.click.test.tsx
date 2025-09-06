import app from 'flarum/forum/app';
import { jest } from '@jest/globals';
import addBestAnswerView from '@src/forum/addBestAnswerView';
import { capturedExts } from 'flarum/common/extend';
import { createItems } from '@helpers/items';

describe('addBestAnswerView sidebar jump button onclick', () => {
  beforeEach(() => {
    (app.forum as any).attribute = (k: string) => (k === 'bestAnswerDiscussionSidebarJumpButton' ? true : undefined);
  });

  test('invokes stream.goToNumber on click', () => {
    addBestAnswerView();
    const e = capturedExts.find((x) => x.method === 'sidebarItems')!;
    const items = createItems();

    const post = { number: () => 5, isHidden: () => false } as any;
    const discussion = { hasBestAnswer: () => true, bestAnswerPost: () => post } as any;

    // Mock current discussion page stream
    const goToNumber = jest.fn();
    (app.current as any) = { get: () => ({ goToNumber }), getSubtree: () => ({}) } as any;

    e.fn.call({ discussion }, items);
    const vnode = items.get('jumpToBestAnswer');

    // Execute the onclick handler
    vnode.attrs.onclick();
    expect(goToNumber).toHaveBeenCalledWith(5);
  });
});
