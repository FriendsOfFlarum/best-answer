import Notification from 'flarum/components/Notification';

export default class SelectBestAnswerNotification extends Notification {
    icon() {
        return 'fas fa-comment-dots';
    }

    href() {
        const notification = this.props.notification;
        const discussion = notification.subject();

        return app.route.discussion(discussion);
    }

    content() {
        return app.translator.trans('fof-best-answer.forum.notification.content');
    }
}
