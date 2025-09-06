import app from 'flarum/forum/app';
import { capturedExts } from 'flarum/common/extend';
import addBestAnswerAction from '@src/forum/addBestAnswerAction';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import { createItems } from '@helpers/items';

describe('addBestAnswerAction ineligible gates', () => {
  beforeEach(() => {
    (app.forum as any).attribute = (key: string) => (key === 'useAlternativeBestAnswerUi' ? false : undefined);
    (app.current as any).matches = (C: any) => C === DiscussionPage;
    (app.session as any).user = { id: () => '1' } as any;
  });

  type ItemsLike = { get: (k: string) => any; has: (k: string) => boolean };
  function run(post: any) {
    addBestAnswerAction();
    const e = capturedExts.find((x) => x.method === 'moderationControls') as unknown as { fn: Function };
    const items = createItems() as unknown as ItemsLike;
    e.fn.call(null, items, post);
    return items;
  }

  test('skips when post is hidden', () => {
    const post = {
      pushAttributes: () => {},
      contentType: () => 'comment',
      isHidden: () => true,
      number: () => 2,
      user: () => ({ id: () => '2' }),
      id: () => '42',
      discussion: () => ({ canSelectBestAnswer: () => true, hasBestAnswer: () => false, bestAnswerPost: () => null }),
    } as any;
    const items = run(post);
    expect(items.has('bestAnswer')).toBe(false);
  });

  test('skips when first post', () => {
    const post = {
      pushAttributes: () => {},
      contentType: () => 'comment',
      isHidden: () => false,
      number: () => 1,
      user: () => ({ id: () => '2' }),
      id: () => '42',
      discussion: () => ({ canSelectBestAnswer: () => true, hasBestAnswer: () => false, bestAnswerPost: () => null }),
    } as any;
    const items = run(post);
    expect(items.has('bestAnswer')).toBe(false);
  });

  test('skips when cannot select best answer', () => {
    const post = {
      pushAttributes: () => {},
      contentType: () => 'comment',
      isHidden: () => false,
      number: () => 2,
      user: () => ({ id: () => '2' }),
      id: () => '42',
      discussion: () => ({ canSelectBestAnswer: () => false, hasBestAnswer: () => false, bestAnswerPost: () => null }),
    } as any;
    const items = run(post);
    expect(items.has('bestAnswer')).toBe(false);
  });

  test('skips when not on DiscussionPage', () => {
    (app.current as any).matches = () => false;
    const post = {
      pushAttributes: () => {},
      contentType: () => 'comment',
      isHidden: () => false,
      number: () => 2,
      user: () => ({ id: () => '2' }),
      id: () => '42',
      discussion: () => ({ canSelectBestAnswer: () => true, hasBestAnswer: () => false, bestAnswerPost: () => null }),
    } as any;
    const items = run(post);
    expect(items.has('bestAnswer')).toBe(false);
  });
});
