import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import mq from 'mithril-query';
import { jest } from '@jest/globals';
import type Tag from 'ext:flarum/tags/common/models/Tag';
import tagsExtend from 'ext:flarum/tags/common/extend';
import extend from '../../../src/forum/extend';
import SolvedFilter from '../../../src/forum/components/SolvedFilter';

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'flarum-tags': { extend: tagsExtend }, 'fof-best-answer': { extend } });
  app.boot();
  app.forum.pushAttributes({ showBestAnswerFilterUi: true });

  app.store.pushPayload({
    data: [{ type: 'tags', id: '2', attributes: { name: 'General', slug: 'general', isQnA: false } }],
  });
});

it('renders nothing on a tag without best answers, without reloading the discussion list', () => {
  const request = jest.spyOn(app, 'request').mockReturnValue(new Promise(() => {}));
  app.discussions.bestAnswer = '1';

  const filter = mq(SolvedFilter, { currentTag: app.store.getById<Tag>('tags', '2') });

  expect(filter).not.toHaveElement('.Dropdown');
  expect(request).not.toHaveBeenCalled();

  request.mockRestore();
});
