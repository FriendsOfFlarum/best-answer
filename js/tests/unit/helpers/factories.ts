// Simple factories to create minimal objects that mimic Flarum models used in tests.

export function makeUser(id = '1') {
  return { id: () => id } as any;
}

type PostOpts = {
  id?: string;
  number?: number;
  hidden?: boolean;
  contentType?: string;
  userId?: string;
  discussion?: any;
};

export function makePost(opts: PostOpts = {}) {
  const id = opts.id ?? '1';
  const number = opts.number ?? 2;
  const hidden = !!opts.hidden;
  const contentType = opts.contentType ?? 'comment';
  const userId = opts.userId ?? '2';
  const discussion = opts.discussion ?? makeDiscussion();

  return {
    pushAttributes: (_: any) => {},
    isHidden: () => hidden,
    number: () => number,
    contentType: () => contentType,
    user: () => makeUser(userId),
    id: () => id,
    discussion: () => discussion,
  } as any;
}

type DiscussionOpts = {
  hasBestAnswer?: boolean;
  bestAnswerPostId?: string | null;
  canSelectBestAnswer?: boolean;
};

export function makeDiscussion(opts: DiscussionOpts = {}) {
  const has = opts.hasBestAnswer ?? false;
  const bestId = opts.bestAnswerPostId ?? null;
  const canSelect = opts.canSelectBestAnswer ?? true;

  const discussion: any = {
    hasBestAnswer: () => has,
    bestAnswerPost: () => (bestId ? { id: () => bestId } : null),
    canSelectBestAnswer: () => canSelect,
    data: {},
    saves: [] as any[],
    save(payload: any) {
      this.saves.push(payload);
      return Promise.resolve();
    },
  };

  return discussion;
}
