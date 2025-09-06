import app from 'flarum/forum/app';
import { capturedExts } from 'flarum/common/extend';
import addBestAnswerAction from '@src/forum/addBestAnswerAction';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import { createItems } from '@helpers/items';

describe('addBestAnswerAction own-post blocking', () => {
  beforeEach(() => {
    (app.session as any).user = { id: () => '1' } as any;
    (app.current as any).matches = (C: any) => C === DiscussionPage;
    (app.forum as any).attribute = (k: string) =>
      k === 'useAlternativeBestAnswerUi' ? false : k === 'canSelectBestAnswerOwnPost' ? false : undefined;
  });

  test('skips in classic UI when own post and cannot select own post', () => {
    addBestAnswerAction();
    const e = capturedExts.find((x) => x.method === 'moderationControls') as unknown as { fn: Function };
    const items = createItems() as any;
    const post = {
      pushAttributes: () => {},
      contentType: () => 'comment',
      isHidden: () => false,
      number: () => 2,
      user: () => ({ id: () => '1' }),
      id: () => '42',
      discussion: () => ({ hasBestAnswer: () => false, bestAnswerPost: () => null, canSelectBestAnswer: () => true }),
    } as any;
    e.fn.call(null, items, post);
    expect(items.has('bestAnswer')).toBe(false);
  });

  test('skips in alternative UI when own post and cannot select own post', () => {
    (app.forum as any).attribute = (k: string) =>
      k === 'useAlternativeBestAnswerUi' ? true : k === 'canSelectBestAnswerOwnPost' ? false : undefined;
    addBestAnswerAction();
    const e = capturedExts.find((x) => x.method === 'actionItems') as unknown as { fn: Function };
    const items = createItems() as any;
    const post = {
      pushAttributes: () => {},
      isHidden: () => false,
      number: () => 2,
      user: () => ({ id: () => '1' }),
      id: () => '42',
      discussion: () => ({ hasBestAnswer: () => false, bestAnswerPost: () => null, canSelectBestAnswer: () => true }),
    } as any;
    e.fn.call({ attrs: { post } }, items);
    expect(items.has('bestAnswer')).toBe(false);
  });
});
