import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
import ComposerState from 'flarum/forum/states/ComposerState';
import mq from 'mithril-query';
import type Tag from 'ext:flarum/tags/common/models/Tag';
import tagsExtend from 'ext:flarum/tags/common/extend';
import extend from '../../../src/forum/extend';
import extendDiscussionComposer from '../../../src/forum/extenders/extendDiscussionComposer';

beforeAll(() => {
  bootstrapForum();
  app.bootExtensions({ 'flarum-tags': { extend: tagsExtend }, 'fof-best-answer': { extend } });
  app.boot();
  app.translator.addTranslations({ 'fof-best-answer.forum.composer.titlePlaceholder': 'Question title' });

  app.store.pushPayload({
    data: [{ type: 'tags', id: '1', attributes: { name: 'Q&A', slug: 'q-a', isQnA: true } }],
  });
});

it('keeps the focusable title input in a Q&A tag, with the question placeholder', () => {
  // The registry is cleared before each test, so the lazily loaded composer is registered here.
  extendDiscussionComposer();
  flarum.reg.add('core', 'forum/components/DiscussionComposer', DiscussionComposer);

  const composer = new ComposerState();
  composer.fields.tags = [app.store.getById<Tag>('tags', '1')];

  // Like Composer, pass the body fresh attrs on every redraw.
  const body = mq({ view: () => <DiscussionComposer composer={composer} user={app.session.user} /> });

  expect(body).toHaveElementAttr(DiscussionComposer.focusOnSelector(), 'placeholder', 'Question title');

  body.redraw();

  expect(body).toHaveElementAttr(DiscussionComposer.focusOnSelector(), 'placeholder', 'Question title');
});
