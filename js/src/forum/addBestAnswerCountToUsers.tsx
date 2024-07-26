import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import ItemList from 'flarum/common/utils/ItemList';
import UserCard from 'flarum/forum/components/UserCard';
import Icon from 'flarum/common/components/Icon';

import type Mithril from 'mithril';

export default function addBestAnswerCountToUsers() {
  extend(UserCard.prototype, 'infoItems', function (items: ItemList<Mithril.Children>) {
    const user = this.attrs.user;

    items.add(
      'best-answer-count',
      <span className="UserCard-bestAnswerCount">
        <Icon name="fas fa-check" />
        {app.translator.trans('fof-best-answer.forum.user.best-answer-count', {
          count: user.bestAnswerCount(),
        })}
      </span>,
      55
    );
  });
}
