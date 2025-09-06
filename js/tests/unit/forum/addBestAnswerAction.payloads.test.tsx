import app from 'flarum/forum/app';
import { capturedExts } from 'flarum/common/extend';
import addBestAnswerAction from '@src/forum/addBestAnswerAction';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import { createItems } from '@helpers/items';
import m from 'mithril';
import { jest } from '@jest/globals';

describe('addBestAnswerAction payloads', () => {
  beforeEach(() => {
    (app.session as any).user = { id: () => '1' } as any;
    (app.current as any).matches = (C: any) => C === DiscussionPage;
    (m as any).route = { set: () => {} };
  });

  test('sends set payload when marking as best answer (alt UI)', async () => {
    (app.forum as any).attribute = (k: string) => (k === 'useAlternativeBestAnswerUi' ? true : undefined);
    addBestAnswerAction();
    const e = capturedExts.find((x) => x.method === 'actionItems') as unknown as { fn: Function };
    const items = createItems() as any;

    const discussion = {
      hasBestAnswer: () => false,
      bestAnswerPost: () => null,
      canSelectBestAnswer: () => true,
      save: jest.fn(() => Promise.resolve()),
    } as any;
    const post = {
      pushAttributes: () => {},
      isHidden: () => false,
      number: () => 2,
      user: () => ({ id: () => '2' }),
      id: () => '42',
      discussion: () => discussion,
    } as any;

    e.fn.call({ attrs: { post } }, items);
    const vnode = (items as any).get('bestAnswer');
    await vnode.attrs.onclick();
    expect(discussion.save).toHaveBeenCalledWith(
      expect.objectContaining({
        bestAnswerPostId: '42',
        bestAnswerUserId: '1',
        relationships: expect.objectContaining({ bestAnswerPost: post }),
      }),
      expect.any(Object)
    );
  });

  test('sends unset payload when removing best answer (classic UI)', async () => {
    (app.forum as any).attribute = (k: string) => (k === 'useAlternativeBestAnswerUi' ? false : undefined);
    addBestAnswerAction();
    const e = capturedExts.find((x) => x.method === 'moderationControls') as unknown as { fn: Function };
    const items = createItems() as any;

    const discussion = {
      hasBestAnswer: () => true,
      bestAnswerPost: () => ({ id: () => '42' }),
      canSelectBestAnswer: () => true,
      save: jest.fn(() => Promise.resolve()),
      // Provide relationships bag so the post-save cleanup code path can run safely
      data: { relationships: { bestAnswerPost: {}, bestAnswerUser: {} } },
    } as any;
    const post = {
      pushAttributes: () => {},
      contentType: () => 'comment',
      isHidden: () => false,
      number: () => 2,
      user: () => ({ id: () => '2' }),
      id: () => '42',
      discussion: () => discussion,
    } as any;

    e.fn.call(null, items, post);
    const vnode = (items as any).get('bestAnswer');
    await vnode.attrs.onclick();
    expect(discussion.save).toHaveBeenCalledWith(
      expect.objectContaining({ bestAnswerPostId: 0, relationships: { bestAnswerPost: null } }),
      expect.any(Object)
    );
  });
});
