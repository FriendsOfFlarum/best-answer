import app from 'flarum/forum/app';
import { capturedExts } from 'flarum/common/extend';
import { jest } from '@jest/globals';
import { createItems } from '@helpers/items';
import m from 'mithril';
import addBestAnswerAction from '@src/forum/addBestAnswerAction';

type VNodeLike = { selector?: string | Function; attrs: Record<string, any>; children?: any };
type ItemsLike = { get: (key: string) => VNodeLike; has: (key: string) => boolean };
type ExtLike = { fn: Function };

describe('addBestAnswerAction (UI)', () => {
  beforeEach(() => {
    // Force alternative UI path
    (app.forum as any).attribute = (key: string) => (key === 'useAlternativeBestAnswerUi' || key === 'canSelectBestAnswerOwnPost' ? true : undefined);
    (app.current as any).matches = () => true;
    (app.session as any).user = { id: () => '1' } as any;
  });

  const buildItems = (): ItemsLike => createItems() as any;

  test('renders primary button when no best answer exists', () => {
    addBestAnswerAction();
    const ext = capturedExts.find((e) => e.method === 'actionItems') as unknown as ExtLike;

    const items = buildItems();
    const post = {
      pushAttributes: () => {},
      isHidden: () => false,
      number: () => 2,
      user: () => ({ id: () => '2' }),
      id: () => '42',
      discussion: () => ({
        bestAnswerPost: () => null,
        canSelectBestAnswer: () => true,
        hasBestAnswer: () => false,
      }),
    } as any;

    (m as any).route = { set: () => {} };
    ext.fn.call({ attrs: { post } }, items);

    const vnode = items.get('bestAnswer');
    expect(vnode.attrs.className).toContain('Button Button--primary');
  });

  test('renders link button when another post is already best answer', () => {
    addBestAnswerAction();
    const ext = capturedExts.find((e) => e.method === 'actionItems') as unknown as ExtLike;

    const items = buildItems();
    const post = {
      pushAttributes: () => {},
      isHidden: () => false,
      number: () => 2,
      user: () => ({ id: () => '2' }),
      id: () => '42',
      discussion: () => ({
        bestAnswerPost: () => ({ id: () => '99' }),
        canSelectBestAnswer: () => true,
        hasBestAnswer: () => true,
      }),
    } as any;

    ext.fn.call({ attrs: { post } }, items);

    const vnode = items.get('bestAnswer');
    expect(vnode.attrs.className).toContain('Button Button--link');
  });

  test('click toggles best answer state (saves)', async () => {
    addBestAnswerAction();
    const ext = capturedExts.find((e) => e.method === 'actionItems') as unknown as ExtLike;

    const items = buildItems();
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

    ext.fn.call({ attrs: { post } }, items);
    const vnode = items.get('bestAnswer');
    await vnode.attrs.onclick();
    expect(discussion.save).toHaveBeenCalled();
  });
});
