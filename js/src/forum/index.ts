import app from 'flarum/forum/app';
import SelectBestAnswerNotification from './components/SelectBestAnswerNotification';
import addBestAnswerAction from './addBestAnswerAction';
import addBestAnswerView from './addBestAnswerView';
import addAnsweredBadge from './addAnsweredBadge';
import AwardedBestAnswerNotification from './components/AwardedBestAnswerNotification';
import BestAnswerInDiscussionNotification from './components/BestAnswerInDiscussionNotification';
import extendNotifications from './extenders/extendNotifications';
import addBestAnswerCountToUsers from './addBestAnswerCountToUsers';
import addBestAnswerCountSort from '../common/addBestAnswerCountSort';
import extendSearch from './extenders/extendSearch';
import extendDiscussionsSearchSource from './extenders/extendDiscussionSearchSource';
import extendIndexPage from './extenders/extendIndexPage';
import extendDiscussionListState from './extenders/extendDiscussionListState';
import extendDiscussionComposer from './extenders/extendDiscussionComposer';

export * from './components';

export { default as extend } from './extend';

app.initializers.add('fof/best-answer', () => {
  app.notificationComponents.selectBestAnswer = SelectBestAnswerNotification;
  app.notificationComponents.awardedBestAnswer = AwardedBestAnswerNotification;
  app.notificationComponents.bestAnswerInDiscussion = BestAnswerInDiscussionNotification;

  addAnsweredBadge();
  addBestAnswerAction();
  addBestAnswerView();
  addBestAnswerCountToUsers();
  addBestAnswerCountSort();

  extendNotifications();
  extendSearch();
  extendDiscussionsSearchSource();
  extendIndexPage();
  extendDiscussionListState();
  extendDiscussionComposer();
});
