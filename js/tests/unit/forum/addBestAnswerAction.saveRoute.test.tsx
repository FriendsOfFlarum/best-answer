import app from 'flarum/forum/app';
import { capturedExts } from 'flarum/common/extend';
import addBestAnswerAction from '@src/forum/addBestAnswerAction';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import { createItems } from '@helpers/items';
import m from 'mithril';
import { jest } from '@jest/globals';

describe('addBestAnswerAction save + route', () => {
  beforeEach(() => {
    (app.forum as any).attribute = (key: string) => (key === 'useAlternativeBestAnswerUi' ? false : undefined);
    (app.current as any).matches = (C: any) => C === DiscussionPage;
    (app.session as any).user = { id: () => '1' } as any;
    (m as any).route = { set: jest.fn() };
  });

  test('redirects to discussion after setting best answer', async () => {
    addBestAnswerAction();
    const e = capturedExts.find((x) => x.method === 'moderationControls') as unknown as { fn: Function };
    const items = createItems() as any;

    const discussion = {
      hasBestAnswer: () => false,
      bestAnswerPost: () => null,
      canSelectBestAnswer: () => true,
      save: jest.fn(() => Promise.resolve()),
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

    expect(discussion.save).toHaveBeenCalled();
    expect((m as any).route.set).toHaveBeenCalled();
  });
});
