import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import Discussion from 'flarum/common/models/Discussion';
import Model from 'flarum/common/Model';
import NotificationGrid from 'flarum/forum/components/NotificationGrid';

import SelectBestAnswerNotification from './components/SelectBestAnswerNotification';
import addBestAnswerAction from './addBestAnswerAction';
import addBestAnswerView from './addBestAnswerView';
import addAnsweredBadge from './addAnsweredBadge';
import AwardedBestAnswerNotification from './components/AwardedBestAnswerNotification';
import BestAnswerInDiscussionNotification from './components/BestAnswerInDiscussionNotification';

app.initializers.add('fof/best-answer', () => {
    Discussion.prototype.bestAnswerPost = Model.hasOne('bestAnswerPost');
    Discussion.prototype.bestAnswerUser = Model.hasOne('bestAnswerUser');
    Discussion.prototype.hasBestAnswer = Model.attribute('hasBestAnswer');
    Discussion.prototype.canSelectBestAnswer = Model.attribute('canSelectBestAnswer');
    Discussion.prototype.bestAnswerSetAt = Model.attribute('bestAnswerSetAt', Model.transformDate);

    app.notificationComponents.selectBestAnswer = SelectBestAnswerNotification;
    app.notificationComponents.awardedBestAnswer = AwardedBestAnswerNotification;
    app.notificationComponents.bestAnswerInDiscussion = BestAnswerInDiscussionNotification;

    addAnsweredBadge();
    addBestAnswerAction();
    addBestAnswerView();

    extend(NotificationGrid.prototype, 'notificationTypes', function (items) {
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
});
