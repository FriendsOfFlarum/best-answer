import Notification from 'flarum/components/Notification';

export default class AwardedBestAnswerNotification extends Notification {
    icon() {
        return 'fas fa-check';
    }

    href() {
        const notification = this.props.notification;
        const discussion = notification.subject();

        return app.route.discussion(discussion);
    }

    content() {
        const user = this.props.notification.fromUser();
        return app.translator.trans('fof-best-answer.forum.notification.awarded', {
            user: user,
        });
    }
}
