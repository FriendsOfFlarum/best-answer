import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import type Tag from 'ext:flarum/tags/common/models/Tag';

export default function extendDiscussionComposer() {
  // Core's title input reads this attr when the header is built, so it has to be set before the view renders.
  extend('flarum/forum/components/DiscussionComposer', ['oninit', 'onbeforeupdate'], function () {
    const tags = this.composer.fields.tags as Tag[];
    if (tags === undefined) return;

    const qna = tags.some((t) => t.isQnA());

    if (!qna) return;

    this.attrs.titlePlaceholder = app.translator.trans('fof-best-answer.forum.composer.titlePlaceholder');
  });
}
