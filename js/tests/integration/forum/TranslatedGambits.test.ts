import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import extend from '../../../src/forum/extend';

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'fof-best-answer': { extend } });
  app.boot();
  app.translator.addTranslations({
    'core.lib.gambits.group_keys.is': 'ist',
    'fof-best-answer.lib.gambits.solved-discussions.key': 'gelöst',
    'fof-best-answer.lib.gambits.qna.key': 'frage',
    'fof-best-answer.lib.gambits.solution.key': 'lösung',
  });
});

describe.each([
  ['discussions', 'ist:gelöst', 'is:solved', 'solved-discussions'],
  ['discussions', 'ist:frage', 'is:question', 'qna'],
  ['posts', 'ist:lösung', 'is:solution', 'solution'],
])('%s gambit on a translated forum', (type, translated, english, filterKey) => {
  it(`turns the translated ${translated} into the ${filterKey} filter`, () => {
    expect(app.search.gambits.apply(type, { q: translated })).toStrictEqual({ q: '', [filterKey]: true });
  });

  it(`still turns the English ${english} into the ${filterKey} filter`, () => {
    expect(app.search.gambits.apply(type, { q: english })).toStrictEqual({ q: '', [filterKey]: true });
  });

  it(`still turns the negated English -${english} into the negated filter`, () => {
    expect(app.search.gambits.apply(type, { q: `-${english}` })).toStrictEqual({ q: '', [`-${filterKey}`]: true });
  });
});
