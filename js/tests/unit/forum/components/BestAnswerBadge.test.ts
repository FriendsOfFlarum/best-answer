// Use moduleNameMapper stubs for Flarum internals

import BestAnswerBadge from '@src/forum/components/BestAnswerBadge';

describe('BestAnswerBadge', () => {
  test('sets type, icon, and translated label', () => {
    const attrs: any = {};
    // Static initializer mutates attrs
    (BestAnswerBadge as any).initAttrs(attrs);

    expect(attrs.type).toBe('bestAnswer');
    expect(attrs.icon).toBe('fas fa-check');
    expect(attrs.label).toBe('translated:fof-best-answer.forum.answered_badge');
  });
});
