import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import DiscussionListState from 'flarum/forum/states/DiscussionListState';

export default function extendDiscussionListState() {
  extend(DiscussionListState.prototype, 'requestParams', function (params) {
    if (app.discussions.bestAnswer) {
      const negate = app.discussions.bestAnswer === '2';
      const prepend = negate ? '-' : '';

      params.filter[`${prepend}solved-discussions`] = true;

      if (params.filter.q) {
        params.filter.q += ` ${prepend}is:solved`;
      }
    }
  });
}
