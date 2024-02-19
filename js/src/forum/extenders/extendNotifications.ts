import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import ItemList from 'flarum/common/utils/ItemList';
import NotificationGrid from 'flarum/forum/components/NotificationGrid';
import type Mithril from 'mithril';

export default function () {
  extend(NotificationGrid.prototype, 'notificationTypes', function (items: ItemList<{ name: string; icon: string; label: Mithril.Children }>) {
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
    items.add('selectBestAnswer', {
      name: 'selectBestAnswer',
      icon: 'fas fa-stopwatch',
      label: app.translator.trans('fof-best-answer.forum.notification.preferences.select_best_answer'),
    });
  });
}
