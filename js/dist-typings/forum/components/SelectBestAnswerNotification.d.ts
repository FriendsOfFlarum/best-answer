import Notification from 'flarum/forum/components/Notification';
export default class SelectBestAnswerNotification extends Notification {
    icon(): string;
    href(): string;
    content(): string | any[];
    excerpt(): null;
}
