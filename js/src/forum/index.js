import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Discussion from 'flarum/common/models/Discussion';
import Tag from 'flarum/tags/models/Tag';
import Model from 'flarum/common/Model';
import NotificationGrid from 'flarum/forum/components/NotificationGrid';
import IndexPage from 'flarum/forum/components/IndexPage';
import Dropdown from 'flarum/common/components/Dropdown';
import Button from 'flarum/common/components/Button';
import DiscussionListState from 'flarum/forum/states/DiscussionListState';

import SelectBestAnswerNotification from './components/SelectBestAnswerNotification';
import addBestAnswerAction from './addBestAnswerAction';
import addBestAnswerView from './addBestAnswerView';
import addAnsweredBadge from './addAnsweredBadge';
import AwardedBestAnswerNotification from './components/AwardedBestAnswerNotification';
import BestAnswerInDiscussionNotification from './components/BestAnswerInDiscussionNotification';

export * from './components';

app.initializers.add('fof/best-answer', () => {
    Discussion.prototype.bestAnswerPost = Model.hasOne('bestAnswerPost');
    Discussion.prototype.bestAnswerUser = Model.hasOne('bestAnswerUser');
    Discussion.prototype.hasBestAnswer = Model.attribute('hasBestAnswer');
    Discussion.prototype.canSelectBestAnswer = Model.attribute('canSelectBestAnswer');
    Discussion.prototype.bestAnswerSetAt = Model.attribute('bestAnswerSetAt', Model.transformDate);

    Tag.prototype.isQnA = Model.attribute('isQnA');

    app.notificationComponents.selectBestAnswer = SelectBestAnswerNotification;
    app.notificationComponents.awardedBestAnswer = AwardedBestAnswerNotification;
    app.notificationComponents.bestAnswerInDiscussion = BestAnswerInDiscussionNotification;

    addAnsweredBadge();
    addBestAnswerAction();
    addBestAnswerView();

    extend(NotificationGrid.prototype, 'notificationTypes', function (items) {
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
    });

    extend(IndexPage.prototype, 'sidebarItems', function (items) {
        const tag = this.currentTag();

        if (!tag || !tag.isQnA()) return;

        const canStartDiscussion = app.forum.attribute('canStartDiscussion') || !app.session.user;
        const cta = items.get('newDiscussion');
        cta.children = app.translator.trans(
            canStartDiscussion ? 'fof-best-answer.forum.index.ask_question' : 'fof-best-answer.index.cannot_ask_question'
        );

        items.replace('startDiscussion', cta);
    });

    extend(IndexPage.prototype, 'viewItems', function (items) {
        const tag = this.currentTag();

        if (!tag || !tag.isQnA()) {
            if (app.discussions.bestAnswer) {
                delete app.discussions.bestAnswer;
                app.discussions.refresh();
            }
            
            return;
        }

        const options = ['all', 'solved', 'unsolved'];

        const selected = app.discussions.bestAnswer;

        items.add(
            'solved-filter',
            Dropdown.component({
                buttonClassName: 'Button',
                label: app.translator.trans(`fof-best-answer.forum.filter.${(options[selected] || Object.keys(options).map((key) => options[key])[0])}_label`),
                accessibleToggleLabel: 'assessible label',
            },
            Object.keys(options).map((value) => {
                const label = options[value];
                const active = (selected || Object.keys(options)[0]) === value;

                return Button.component(
                    {
                        icon: active? 'fas fa-check' : true,
                        active: active,
                        onclick: () => {
                            app.discussions.bestAnswer = value;
                            if (value === '0') { delete app.discussions.bestAnswer; }
                            app.discussions.refresh();
                        },
                    },
                    app.translator.trans(`fof-best-answer.forum.filter.${label}_label`)
                );
            }))
        );
    });

    extend(DiscussionListState.prototype, 'requestParams', function (params) {
        if (app.discussions.bestAnswer) {
            const negate = app.discussions.bestAnswer === '2';

            params.filter[`${negate ? '-' : ''}solved-discussions`] = true;
        }
    });
});
