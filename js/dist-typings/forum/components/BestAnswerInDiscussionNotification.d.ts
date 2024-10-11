/// <reference types="flarum/@types/translator-icu-rich" />
export default class BestAnswerInDiscussionNotification extends Notification<import("flarum/forum/components/Notification").INotificationAttrs> {
    constructor();
    content(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    excerpt(): null;
}
import Notification from "flarum/forum/components/Notification";
