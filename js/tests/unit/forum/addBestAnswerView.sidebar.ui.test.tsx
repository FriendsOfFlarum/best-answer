import app from 'flarum/forum/app';
import addBestAnswerView from '@src/forum/addBestAnswerView';
import { capturedExts } from 'flarum/common/extend';
import { createItems } from '@helpers/items';

describe('addBestAnswerView sidebar jump button', () => {
  beforeEach(() => {
    (app.forum as any).attribute = (k: string) => (k === 'bestAnswerDiscussionSidebarJumpButton' ? true : undefined);
  });

  test('adds jump button when best answer is not hidden and number != 1', () => {
    addBestAnswerView();
    const e = capturedExts.find((x) => x.method === 'sidebarItems')!;
    const items = createItems();
    const post = { number: () => 2, isHidden: () => false } as any;
    const discussion = { hasBestAnswer: () => true, bestAnswerPost: () => post } as any;

    e.fn.call({ discussion }, items);
    expect(items.has('jumpToBestAnswer')).toBe(true);
    const vnode = items.get('jumpToBestAnswer');
    expect(vnode.attrs.className).toContain('Button Button-jumpBestAnswer');
  });

  test('does not add when hidden or number is 1', () => {
    addBestAnswerView();
    const e = capturedExts.find((x) => x.method === 'sidebarItems')!;
    const itemsHidden = createItems();
    const postHidden = { number: () => 2, isHidden: () => true } as any;
    const discussionHidden = { hasBestAnswer: () => true, bestAnswerPost: () => postHidden } as any;
    e.fn.call({ discussion: discussionHidden }, itemsHidden);
    expect(itemsHidden.has('jumpToBestAnswer')).toBe(false);

    const itemsFirst = createItems();
    const postFirst = { number: () => 1, isHidden: () => false } as any;
    const discussionFirst = { hasBestAnswer: () => true, bestAnswerPost: () => postFirst } as any;
    e.fn.call({ discussion: discussionFirst }, itemsFirst);
    expect(itemsFirst.has('jumpToBestAnswer')).toBe(false);
  });
});
