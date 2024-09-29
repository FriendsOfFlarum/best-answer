import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';

export default function extendDiscussionComposer() {
  extend(DiscussionComposer.prototype, 'headerItems', function (items) {
    const tags = this.composer.fields.tags;
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
