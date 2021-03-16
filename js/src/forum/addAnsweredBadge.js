import app from 'flarum/common/app';
import { extend } from 'flarum/common/extend';
import Badge from 'flarum/common/components/Badge';
import Discussion from 'flarum/common/models/Discussion';

export default function () {
    extend(Discussion.prototype, 'badges', function (items) {
        if (this.hasBestAnswer() && !items.has('hidden')) {
            items.add(
                'bestAnswer',
                Badge.component({
                    type: 'bestAnswer',
                    icon: 'fas fa-check',
                    label: app.translator.trans('fof-best-answer.forum.answered_badge'),
                })
            );
        }
    });
}
