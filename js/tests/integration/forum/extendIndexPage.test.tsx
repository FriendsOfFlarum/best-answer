import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import IndexSidebar from 'flarum/forum/components/IndexSidebar';
import mq from 'mithril-query';
import type Tag from 'ext:flarum/tags/common/models/Tag';
import tagsExtend from 'ext:flarum/tags/common/extend';
import extend from '../../../src/forum/extend';
import extendIndexPage from '../../../src/forum/extenders/extendIndexPage';

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'flarum-tags': { extend: tagsExtend }, 'fof-best-answer': { extend } });
  app.boot();
  extendIndexPage();

  app.translator.addTranslations({
    'fof-best-answer.forum.index.ask_question': 'Ask a Question',
    'fof-best-answer.forum.index.cannot_ask_question': 'Cannot Ask a Question',
  });

  app.store.pushPayload({
    data: [{ type: 'tags', id: '1', attributes: { name: 'Q&A', slug: 'q-a', isQnA: true } }],
  });
  app.currentTag = () => app.store.getById<Tag>('tags', '1');
});

it.each([
  [true, 'Ask a Question'],
  [false, 'Cannot Ask a Question'],
])('announces the new discussion button in a Q&A tag by its visible label (can start: %s)', (canStartDiscussion, label) => {
  app.forum.pushAttributes({ canStartDiscussion });

  const sidebar = mq(IndexSidebar);

  expect(sidebar.first('.IndexPage-newDiscussion .Button-label').textContent).toBe(label);
  expect(sidebar).toHaveElementAttr('.IndexPage-newDiscussion', 'aria-label', label);
});
