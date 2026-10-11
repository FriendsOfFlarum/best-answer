import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import DiscussionListState from 'flarum/forum/states/DiscussionListState';
import type { PaginatedListParams } from 'flarum/common/states/PaginatedListState';
import type Tag from 'ext:flarum/tags/common/models/Tag';

export default function extendDiscussionListState() {
  extend(DiscussionListState.prototype, 'requestParams', function (this: DiscussionListState, params: PaginatedListParams) {
    if (!app.discussions.bestAnswer) return;

    // The choice is kept on the shared list state, so it must only apply to a list of a Q&A tag.
    const slug = (this.params as { tags?: string }).tags;
    const tag = slug ? app.store.getBy<Tag>('tags', 'slug', slug) : undefined;

    if (!tag?.isQnA?.()) return;

    const prepend = app.discussions.bestAnswer === '2' ? '-' : '';

    if (!params.filter) {
      params.filter = {};
    }

    params.filter[`${prepend}solved-discussions`] = 'true';
  });
}
