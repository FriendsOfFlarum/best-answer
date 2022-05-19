import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Model from 'flarum/common/Model';
import User from 'flarum/common/models/User';
import ItemList from 'flarum/common/utils/ItemList';
import UserCard from 'flarum/forum/components/UserCard';
import icon from 'flarum/common/helpers/icon';

import type Mithril from 'mithril';

export default function addBestAnswerCountToUsers() {
  User.prototype.bestAnswerCount = Model.attribute<number>('bestAnswerCount');

  extend(UserCard.prototype, 'infoItems', function (items: ItemList<Mithril.Children>) {
    const user = this.attrs.user;

    items.add(
      'best-answer-count',
      <span className="UserCard-bestAnswerCount">
        {icon('fas fa-check')}
        {app.translator.trans('fof-best-answer.forum.user.best-answer-count', {
          count: user.bestAnswerCount(),
        })}
      </span>
    );
  });
}
