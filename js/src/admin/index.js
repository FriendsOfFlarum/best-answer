import { extend } from 'flarum/extend';
import PermissionGrid from 'flarum/components/PermissionGrid';
import { settings } from '@fof-components';

const {
    SettingsModal,
    items: { BooleanItem, NumberItem, StringItem },
} = settings;

app.initializers.add('fof/best-answer', () => {
    app.extensionSettings['fof-best-answer'] = () =>
        app.modal.show(SettingsModal, {
            title: app.translator.trans('fof-best-answer.admin.settings.title'),
            type: 'small',
            items: e => [
                <BooleanItem setting={e} name="fof-best-answer.allow_select_own_post">
                    {app.translator.trans('fof-best-answer.admin.settings.allow_select_own_post')}
                </BooleanItem>,
                <BooleanItem setting={e} name="fof-best-answer.use_alternative_ui">
                    {app.translator.trans('fof-best-answer.admin.settings.use_alt_ui')}
                </BooleanItem>,
                <NumberItem setting={e} name="fof-best-answer.select_best_answer_reminder_days" min="0" placeholder="0">
                    {app.translator.trans('fof-best-answer.admin.settings.select_best_answer_reminder_days')}
                </NumberItem>,
                <StringItem setting={e} name="fof-best-answer.remind_tag_ids">
                    {app.translator.trans('fof-best-answer.admin.settings.remind_tag_ids')}
                </StringItem>,
                <BooleanItem setting={e} name="fof-best-answer.schedule_on_one_server">
                    {app.translator.trans('fof-best-answer.admin.settings.schedule_on_one_server')}
                </BooleanItem>,
                <BooleanItem setting={e} name="fof-best-answer.stop_overnight">
                    {app.translator.trans('fof-best-answer.admin.settings.schedule_stop_overnight')}
                </BooleanItem>,
                <BooleanItem setting={e} name="fof-best-answer.store_log_output">
                    {app.translator.trans('fof-best-answer.admin.settings.schedule_log_output')}
                </BooleanItem>,
            ],
        });

    extend(PermissionGrid.prototype, 'replyItems', function(items) {
        items.add('selectBestAnswer', {
            icon: 'far fa-comment',
            label: app.translator.trans('fof-best-answer.admin.permissions.best_answer'),
            permission: 'discussion.selectBestAnswerOwnDiscussion',
        });

        items.add('selectBestAnswerNotAuthor', {
            icon: 'far fa-comment',
            label: app.translator.trans('fof-best-answer.admin.permissions.best_answer_not_own_discussion'),
            permission: 'discussion.selectBestAnswerNotOwnDiscussion',
        });
    });
});
