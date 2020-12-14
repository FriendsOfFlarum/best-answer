import app from 'flarum/app';

app.initializers.add('fof-best-answer', () => {
    app.extensionData.for('fof-best-answer')
        .registerSetting({
            setting: 'fof-best-answer.allow_select_own_post',
            type: 'boolean',
            label: app.translator.trans('fof-best-answer.admin.settings.allow_select_own_post')
        })
        .registerSetting({
            setting: 'fof-best-answer.use_alternative_ui',
            type: 'boolean',
            label: app.translator.trans('fof-best-answer.admin.settings.use_alt_ui')
        })
        .registerSetting({
            setting: 'fof-best-answer.select_best_answer_reminder_days',
            type: 'number',
            label: app.translator.trans('fof-best-answer.admin.settings.select_best_answer_reminder_days')
        })
        .registerSetting({
            setting: 'fof-best-answer.remind_tag_ids',
            type: 'string',
            label: app.translator.trans('fof-best-answer.admin.settings.remind_tag_ids')
        })
        .registerSetting({
            setting: 'fof-best-answer.schedule_on_one_server',
            type: 'boolean',
            label: app.translator.trans('fof-best-answer.admin.settings.schedule_on_one_server')
        })
        .registerSetting({
            setting: 'fof-best-answer.stop_overnight',
            type: 'boolean',
            label: app.translator.trans('fof-best-answer.admin.settings.schedule_stop_overnight')
        })
        .registerSetting({
            setting: 'fof-best-answer.store_log_output',
            type: 'boolean',
            label: app.translator.trans('fof-best-answer.admin.settings.schedule_log_output')
        })
        .registerPermission({
            icon: 'far fa-comment',
            label: app.translator.trans('fof-best-answer.admin.permissions.best_answer'),
            permission: 'discussion.selectBestAnswerOwnDiscussion'
        }, 'reply')
        .registerPermission({
            icon: 'far fa-comment',
            label: app.translator.trans('fof-best-answer.admin.permissions.best_answer_not_own_discussion'),
            permission: 'discussion.selectBestAnswerNotOwnDiscussion'
        }, 'reply')
});
