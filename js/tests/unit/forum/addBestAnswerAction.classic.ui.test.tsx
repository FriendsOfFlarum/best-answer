import app from 'flarum/forum/app';
import { capturedExts } from 'flarum/common/extend';
import { createItems } from '@helpers/items';
import addBestAnswerAction from '@src/forum/addBestAnswerAction';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';

describe('addBestAnswerAction (classic UI)', () => {
  beforeEach(() => {
    (app.forum as any).attribute = (key: string) => (key === 'useAlternativeBestAnswerUi' ? false : undefined);
    (app.current as any).matches = (C: any) => C === DiscussionPage;
    (app.session as any).user = { id: () => '1' } as any;
  });

  const buildItems = () => createItems();
  type ItemsLike = { get: (k: string) => any; has: (k: string) => boolean };
  type ExtLike = { fn: Function };

  function ext() {
    addBestAnswerAction();
    return capturedExts.find((e) => e.method === 'moderationControls') as unknown as ExtLike;
  }

  test('adds action with label and icon when post is not best answer', () => {
    const e = ext();
    const items = buildItems() as unknown as ItemsLike;
    const post = {
      pushAttributes: () => {},
      contentType: () => 'comment',
      isHidden: () => false,
      number: () => 2,
      user: () => ({ id: () => '2' }),
      id: () => '42',
      discussion: () => ({ hasBestAnswer: () => false, bestAnswerPost: () => null, canSelectBestAnswer: () => true }),
    } as any;

    e.fn.call(null, items, post);
    const vnode = items.get('bestAnswer');
    expect(vnode.attrs.icon).toBe('far fa-comment-dots');
    expect(vnode.children.join('')).toContain('translated:fof-best-answer.forum.this_best_answer');
  });

  test('adds action with remove label and solid icon when already best answer', () => {
    const e = ext();
    const items = buildItems() as unknown as ItemsLike;
    const post = {
      pushAttributes: () => {},
      contentType: () => 'comment',
      isHidden: () => false,
      number: () => 2,
      user: () => ({ id: () => '2' }),
      id: () => '42',
      discussion: () => ({ hasBestAnswer: () => true, bestAnswerPost: () => ({ id: () => '42' }), canSelectBestAnswer: () => true }),
    } as any;

    e.fn.call(null, items, post);
    const vnode = items.get('bestAnswer');
    expect(vnode.attrs.icon).toBe('fas fa-comment-dots');
    expect(vnode.children.join('')).toContain('translated:fof-best-answer.forum.remove_best_answer');
  });

  test('does not add action when post is not a comment', () => {
    const e = ext();
    const items = buildItems() as unknown as ItemsLike;
    const post = {
      pushAttributes: () => {},
      contentType: () => 'note',
      isHidden: () => false,
      number: () => 2,
      user: () => ({ id: () => '2' }),
      id: () => '42',
      discussion: () => ({ hasBestAnswer: () => false, bestAnswerPost: () => null, canSelectBestAnswer: () => true }),
    } as any;

    e.fn.call(null, items, post);
    expect(items.has('bestAnswer')).toBe(false);
  });
});
