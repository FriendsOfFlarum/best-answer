import app from 'flarum/forum/app';
import Notification from 'flarum/forum/components/Notification';

export default class SelectBestAnswerNotification extends Notification {
  icon() {
    return 'fas fa-comment-dots';
  }

  href() {
    const notification = this.attrs.notification;
    const discussion = notification.subject();

    return app.route.discussion(discussion);
  }

  content() {
    return app.translator.trans('fof-best-answer.forum.notification.content');
  }

  excerpt() {
    return null;
  }
}
