import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import extend from '../../../src/forum/extend';

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'fof-best-answer': { extend } });
  app.boot();
  app.translator.addTranslations({
    'core.lib.gambits.group_keys.is': 'is',
    'fof-best-answer.lib.gambits.qna.key': 'question',
    'fof-best-answer.lib.gambits.solved-discussions.key': 'solved',
  });
});

it('turns is:question into the Q&A filter', () => {
  expect(app.search.gambits.apply('discussions', { q: 'is:question' })).toEqual({ q: '', qna: true });
});

it('combines with -is:solved to find unsolved questions', () => {
  expect(app.search.gambits.apply('discussions', { q: 'is:question -is:solved' })).toEqual({ q: '', qna: true, '-solved-discussions': true });
});
