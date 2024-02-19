import { extend } from 'flarum/common/extend';
import Discussion from 'flarum/common/models/Discussion';
import BestAnswerBadge from './components/BestAnswerBadge';

export default function () {
  extend(Discussion.prototype, 'badges', function (this: Discussion, items) {
    if (this.hasBestAnswer() && !items.has('hidden')) {
      items.add('bestAnswer', <BestAnswerBadge />);
    }
  });
}
