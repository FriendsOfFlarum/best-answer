import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Discussion from 'flarum/common/models/Discussion';
import Tag from 'flarum/tags/models/Tag';
import Model from 'flarum/common/Model';
import IndexPage from 'flarum/forum/components/IndexPage';
import Dropdown from 'flarum/common/components/Dropdown';
import Button from 'flarum/common/components/Button';
import DiscussionListState from 'flarum/forum/states/DiscussionListState';
import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';

import SelectBestAnswerNotification from './components/SelectBestAnswerNotification';
import addBestAnswerAction from './addBestAnswerAction';
import addBestAnswerView from './addBestAnswerView';
import addAnsweredBadge from './addAnsweredBadge';
import AwardedBestAnswerNotification from './components/AwardedBestAnswerNotification';
import BestAnswerInDiscussionNotification from './components/BestAnswerInDiscussionNotification';
import extendNotifications from './extend/extendNotifications';
import User from 'flarum/common/models/User';
import addBestAnswerCountToUsers from './addBestAnswerCountToUsers';
import extendIndexPage from './extend/extendIndexPage';
import Post from 'flarum/common/models/Post';

export * from './components';

app.initializers.add('fof/best-answer', () => {
  Discussion.prototype.bestAnswers = Model.hasMany('bestAnswers');
  Discussion.prototype.hasBestAnswer = Model.attribute('hasBestAnswer');

  Post.prototype.canSelectAsBestAnswer = Model.attribute('canSelectAsBestAnswer');
  Post.prototype.solutionSetBy = Model.hasOne('solutionSetBy');
  Post.prototype.solutionSetAt = Model.attribute('solutionSetAt', Model.transformDate);

  if (app.initializers.has('flarum-tags')) {
    Tag.prototype.isQnA = Model.attribute('isQnA');
  }

  app.notificationComponents.selectBestAnswer = SelectBestAnswerNotification;
  app.notificationComponents.awardedBestAnswer = AwardedBestAnswerNotification;
  app.notificationComponents.bestAnswerInDiscussion = BestAnswerInDiscussionNotification;

  addAnsweredBadge();
  addBestAnswerAction();
  addBestAnswerView();
  addBestAnswerCountToUsers();

  extendNotifications();

  extendIndexPage();

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

  extend(DiscussionComposer.prototype, 'headerItems', function (items) {
    const tags = this.composer.fields.tags;
    if (tags === undefined) return;

    const qna = tags.some((t) => t.isQnA());

    if (!qna) return;

    this.attrs.titlePlaceholder = app.translator.trans('fof-best-answer.forum.composer.titlePlaceholder');

    items.replace(
      'discussionTitle',
      <h3>
        <input
          className="FormControl"
          bidi={this.title}
          placeholder={this.attrs.titlePlaceholder}
          disabled={!!this.attrs.disabled}
          onkeydown={this.onkeydown.bind(this)}
        />
      </h3>
    );
  });
});
