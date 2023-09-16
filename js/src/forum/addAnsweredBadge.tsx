import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Badge from 'flarum/common/components/Badge';
import Discussion from 'flarum/common/models/Discussion';

export default function () {
  extend(Discussion.prototype, 'badges', function (this: Discussion, items) {
    if (this.hasBestAnswer() && !items.has('hidden')) {
      items.add('bestAnswer', <Badge type="bestAnswer" icon="fas fa-check" label={app.translator.trans('fof-best-answer.forum.answered_badge')} />);
    }
  });
}
