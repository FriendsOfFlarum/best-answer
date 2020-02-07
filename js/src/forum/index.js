import { extend } from 'flarum/extend';
import app from 'flarum/app';
import Discussion from 'flarum/models/Discussion';
import Model from 'flarum/Model';
import NotificationGrid from 'flarum/components/NotificationGrid';

import SelectBestAnswerNotification from './components/SelectBestAnswerNotification';
import addBestAnswerAction from './addBestAnswerAction';
import addBestAnswerView from './addBestAnswerView';
import addAnsweredBadge from './addAnsweredBadge';
import AwardedBestAnswerNotification from './components/AwardedBestAnswerNotification';

app.initializers.add('fof/best-answer', () => {
    Discussion.prototype.bestAnswerPost = Model.hasOne('bestAnswerPost');
    Discussion.prototype.bestAnswerUser = Model.hasOne('bestAnswerUser');
    Discussion.prototype.hasBestAnswer = Model.attribute('hasBestAnswer');
    Discussion.prototype.startUserId = Model.attribute('startUserId', Number);
    Discussion.prototype.firstPostId = Model.attribute('firstPostId', Number);
    Discussion.prototype.canSelectBestAnswer = Model.attribute('canSelectBestAnswer');
    Discussion.prototype.bestAnswerSetAt = Model.attribute('bestAnswerSetAt', Model.transformDate);

    app.notificationComponents.selectBestAnswer = SelectBestAnswerNotification;
    app.notificationComponents.awardedBestAnswer = AwardedBestAnswerNotification;

    addAnsweredBadge();
    addBestAnswerAction();
    addBestAnswerView();

    extend(NotificationGrid.prototype, 'notificationTypes', function(items) {
        items.add('awardedBestAnswer', {
            name: 'awardedBestAnswer',
            icon: 'fas fa-check',
            label: app.translator.trans('fof-best-answer.forum.notification.preferences.awarded_best_answer'),
        });
    });
});
