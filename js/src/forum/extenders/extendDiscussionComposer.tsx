import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import type Tag from 'ext:flarum/tags/common/models/Tag';

export default function extendDiscussionComposer() {
  extend('flarum/forum/components/DiscussionComposer', 'headerItems', function (items) {
    const tags = this.composer.fields.tags as Tag[];
    if (tags === undefined) return;

    const qna = tags.some((t) => t.isQnA());

    if (!qna) return;

    this.attrs.titlePlaceholder = app.translator.trans('fof-best-answer.forum.composer.titlePlaceholder');

    if (items.has('discussionTitle')) {
      items.setContent(
        'discussionTitle',
        <h3>
          <input
            className="FormControl"
            bidi={this.title}
            placeholder={this.attrs.titlePlaceholder}
            disabled={!!this.attrs.disabled}
            onkeydown={this.onkeydown.bind(this)}
          />
        </h3>
      );
    }
  });
}
