import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
import type Tag from 'flarum/tags/common/models/Tag';

export default function extendDiscussionComposer() {
  extend(DiscussionComposer.prototype, 'headerItems', function (items) {
    const tags = this.composer.fields.tags as Tag[];
    if (tags === undefined) return;

    const qna = tags.some((t) => t.isQnA());

    if (!qna) return;

    // @ts-expect-error
    this.attrs.titlePlaceholder = app.translator.trans('fof-best-answer.forum.composer.titlePlaceholder');

    if (items.has('discussionTitle')) {
      items.setContent(
        'discussionTitle',
        <h3>
          <input
            className="FormControl"
            bidi={this.title}
            // @ts-expect-error
            placeholder={this.attrs.titlePlaceholder}
            // @ts-expect-error
            disabled={!!this.attrs.disabled}
            onkeydown={this.onkeydown.bind(this)}
          />
        </h3>
      );
    }
  });
}
