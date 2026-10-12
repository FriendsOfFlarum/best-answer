import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import extend from '../../../src/forum/extend';

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'fof-best-answer': { extend } });
  app.boot();
  app.translator.addTranslations({ 'fof-best-answer.lib.gambits.solution.key': 'solution' });
});

it('turns is:solution in post search into the solution filter', () => {
  expect(app.search.gambits.apply('posts', { q: 'is:solution' })).toStrictEqual({ q: '', solution: true });
});

it('turns -is:solution in post search into the negated solution filter', () => {
  expect(app.search.gambits.apply('posts', { q: '-is:solution' })).toStrictEqual({ q: '', '-solution': true });
});
