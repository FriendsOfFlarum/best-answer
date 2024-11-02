/// <reference types="flarum/@types/translator-icu-rich" />
import Notification from 'flarum/forum/components/Notification';
export default class SelectBestAnswerNotification extends Notification {
    icon(): string;
    href(): string;
    content(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    excerpt(): null;
}
