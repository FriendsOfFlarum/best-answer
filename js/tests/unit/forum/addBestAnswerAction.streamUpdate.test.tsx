import app from 'flarum/forum/app';
import { capturedExts } from 'flarum/common/extend';
import addBestAnswerAction from '@src/forum/addBestAnswerAction';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import { createItems } from '@helpers/items';
import m from 'mithril';
import { jest } from '@jest/globals';

describe('addBestAnswerAction stream update', () => {
  beforeEach(() => {
    (app.session as any).user = { id: () => '1' } as any;
    (app.current as any).matches = (C: any) => C === DiscussionPage;
    // stream.update is invoked after save; get('stream') should return an object with update()
    const update = jest.fn();
    (app.current as any).get = (k: string) => (k === 'stream' ? { update } : {});
    (m as any).route = { set: () => {} };
  });

  test('calls stream.update when on DiscussionPage after saving', async () => {
    (app.forum as any).attribute = (k: string) => (k === 'useAlternativeBestAnswerUi' ? false : undefined);
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
      contentType: () => 'comment',
      pushAttributes: () => {},
      isHidden: () => false,
      number: () => 2,
      user: () => ({ id: () => '2' }),
      id: () => '42',
      discussion: () => discussion,
    } as any;

    e.fn.call(null, items, post);
    const vnode = (items as any).get('bestAnswer');
    await vnode.attrs.onclick();

    // stream.update should have been called
    expect((app.current as any).get('stream').update).toHaveBeenCalled();
  });
});
