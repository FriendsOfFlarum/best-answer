import app from 'flarum/forum/app';
import { extend } from "flarum/common/extend";
import ItemList from "flarum/common/utils/ItemList";
import NotificationGrid from "flarum/forum/components/NotificationGrid";

export default function () {
    extend(NotificationGrid.prototype, 'notificationTypes', function (items: ItemList) {
        items.add('awardedBestAnswer', {
            name: 'awardedBestAnswer',
            icon: 'fas fa-check',
            label: app.translator.trans('fof-best-answer.forum.notification.preferences.awarded_best_answer'),
        });
        items.add('bestAnswerInDiscussion', {
            name: 'bestAnswerInDiscussion',
            icon: 'fas fa-check',
            label: app.translator.trans('fof-best-answer.forum.notification.preferences.best_answer_in_discussion'),
        });
    });
}
