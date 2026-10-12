import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import Discussion from 'flarum/common/models/Discussion';
import Model from 'flarum/common/Model';
import type Post from 'flarum/common/models/Post';
import tagsExtend from 'ext:flarum/tags/common/extend';
import deckColumnTypes from 'ext:flarum/deck/forum/columns/deckColumnTypes';
import extend from '../../../src/forum/extend';
import deckColumns from '../../../src/forum/deck/deckColumns';

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'flarum-tags': { extend: tagsExtend }, 'fof-best-answer': { extend } });
  app.boot();
  // Tags' forum extend registers this, but it ships as plain JS that Jest can't load.
  (Discussion.prototype as any).tags = Model.hasMany('tags');
  deckColumns().extend(app as any, {} as any);

  app.store.pushPayload({
    data: [
      { type: 'tags', id: '1', attributes: { name: 'Support', slug: 'support', isQnA: true } },
      { type: 'tags', id: '2', attributes: { name: 'General', slug: 'general', isQnA: false } },
    ],
  });
});

const column = (type: string) => deckColumnTypes.get(type).createSource({ id: 'c1', type, width: 360, params: {} }) as any;

/** A column already showing these items. */
function showing(type: string, items: unknown[]) {
  const source = column(type);
  source.state.pages = [{ number: 1, items }];

  return source;
}

const shownIds = (source: any): string[] => source.state.getPages().flatMap((page: any) => page.items.map((item: any) => item.id()));

/** A discussion as the store holds it; `tags` is a list of tag ids. */
function discussion(id: string, attributes: Record<string, unknown> = {}, tags: string[] = ['1']): Discussion {
  app.store.pushPayload({
    data: {
      type: 'discussions',
      id,
      attributes: { title: `Discussion ${id}`, lastPostedAt: '2026-10-01T10:00:00Z', hasBestAnswer: false, ...attributes },
      relationships: { tags: { data: tags.map((tag) => ({ type: 'tags', id: tag })) } },
    },
  } as any);

  return app.store.getById<Discussion>('discussions', id)!;
}

/** A comment in a discussion, as the store holds it. */
function post(id: string, discussionId: string): Post {
  app.store.pushPayload({
    data: {
      type: 'posts',
      id,
      attributes: { number: Number(id), contentType: 'comment', createdAt: '2026-10-01T10:00:00Z' },
      relationships: { discussion: { data: { type: 'discussions', id: discussionId } } },
    },
  } as any);

  return app.store.getById<Post>('posts', id)!;
}

/** A bestAnswerEvent as Deck hands it to a column, after putting its payload in the store. */
function bestAnswerEvent(subject: Discussion) {
  return { name: 'bestAnswerEvent', payload: {}, model: subject, discussion: subject, post: null };
}

describe('the Unsolved questions column', () => {
  it('asks for questions without a best answer', () => {
    expect(column('fof-best-answer-unsolved').state.requestParams().filter).toEqual({ qna: true, '-solved-discussions': true });
  });

  it('takes out a question once it is solved', () => {
    const source = showing('fof-best-answer-unsolved', [discussion('1'), discussion('2')]);

    const result = source.onRealtime(bestAnswerEvent(discussion('1', { hasBestAnswer: 5 })));

    expect(result).toBe('updated');
    expect(shownIds(source)).toEqual(['2']);
  });

  it('puts a question back at the top once its best answer is removed', () => {
    const source = showing('fof-best-answer-unsolved', [discussion('2')]);

    const result = source.onRealtime(bestAnswerEvent(discussion('3')));

    expect(result).toBe('inserted');
    expect(shownIds(source)).toEqual(['3', '2']);
  });

  it('leaves out a discussion outside Q&A tags whose best answer is removed', () => {
    const source = showing('fof-best-answer-unsolved', [discussion('2')]);

    expect(source.onRealtime(bestAnswerEvent(discussion('4', {}, ['2'])))).toBeUndefined();
    expect(shownIds(source)).toEqual(['2']);
  });

  it('drops questions the store knows are solved, without realtime', () => {
    const source = showing('fof-best-answer-unsolved', [discussion('1'), discussion('2')]);
    discussion('1', { hasBestAnswer: 5 });

    source.prune();

    expect(shownIds(source)).toEqual(['2']);
  });
});

describe('the Best answers column', () => {
  it('asks for best answers', () => {
    expect(column('fof-best-answer-best-answers').state.requestParams().filter).toMatchObject({ solution: true });
  });

  it('puts a newly chosen best answer at the top', () => {
    const source = showing('fof-best-answer-best-answers', [post('10', '1')]);
    post('20', '2');

    const result = source.onRealtime(bestAnswerEvent(discussion('2', { hasBestAnswer: 20 })));

    expect(result).toBe('inserted');
    expect(shownIds(source)).toEqual(['20', '10']);
  });

  it('swaps a replaced best answer for the new one', () => {
    const source = showing('fof-best-answer-best-answers', [post('20', '2'), post('10', '1')]);
    post('21', '2');

    expect(source.onRealtime(bestAnswerEvent(discussion('2', { hasBestAnswer: 21 })))).toBe('inserted');
    expect(shownIds(source)).toEqual(['21', '10']);
  });

  it('takes out a best answer once it is removed', () => {
    const source = showing('fof-best-answer-best-answers', [post('20', '2'), post('10', '1')]);

    expect(source.onRealtime(bestAnswerEvent(discussion('2')))).toBe('updated');
    expect(shownIds(source)).toEqual(['10']);
  });

  it('ignores new replies, which are never already a best answer', () => {
    const source = showing('fof-best-answer-best-answers', [post('10', '1')]);
    const reply = post('30', '1');

    expect(
      source.onRealtime({ name: 'Flarum\\Post\\Event\\Posted', payload: {}, model: reply.discussion(), discussion: discussion('1'), post: reply })
    ).toBeUndefined();
    expect(shownIds(source)).toEqual(['10']);
  });

  it('drops answers the store knows were replaced or removed, without realtime', () => {
    const source = showing('fof-best-answer-best-answers', [post('20', '2'), post('10', '1')]);
    discussion('1', { hasBestAnswer: 10 });
    discussion('2', { hasBestAnswer: 21 });

    source.prune();

    expect(shownIds(source)).toEqual(['10']);
  });
});
