import Discussion from 'flarum/models/Discussion';
import Model from 'flarum/Model';

import SelectBestAnswerNotification from './components/SelectBestAnswerNotification';
import addBestAnswerAction from './addBestAnswerAction';
import addBestAnswerView from './addBestAnswerView';
import addAnsweredBadge from './addAnsweredBadge';

app.initializers.add('fof/best-answer', () => {
    Discussion.prototype.bestAnswerPost = Model.hasOne('bestAnswerPost');
    Discussion.prototype.bestAnswerUser = Model.hasOne('bestAnswerUser');
    Discussion.prototype.hasBestAnswer = Model.attribute('hasBestAnswer');
    Discussion.prototype.startUserId = Model.attribute('startUserId', Number);
    Discussion.prototype.firstPostId = Model.attribute('firstPostId', Number);
    Discussion.prototype.canSelectBestAnswer = Model.attribute('canSelectBestAnswer');

    app.notificationComponents.selectBestAnswer = SelectBestAnswerNotification;

    addAnsweredBadge();
    addBestAnswerAction();
    addBestAnswerView();
});
