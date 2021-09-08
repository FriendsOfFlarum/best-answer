import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';

export default class BestAnswerSettings extends ExtensionPage {
    oninit(vnode) {
        super.oninit(vnode);
    }

    content() {
        return [
            <div className="container">
                <div className="BestAnswerSettingsPage">
                    <div className="Form">
                        <div className="Introduction">
                            <p>{app.translator.trans('fof-best-answer.admin.settings.introduction')}</p>
                            <div className="Form-group">
                                {this.buildSettingComponent({
                                    type: 'boolean',
                                    setting: 'fof-best-answer.enable_all_tags',
                                    label: app.translator.trans('fof-best-answer.admin.settings.enable_all_tags'),
                                    help: app.translator.trans('fof-best-answer.admin.settings.enable_all_tags_help'),
                                })}
                                {this.buildSettingComponent({
                                    type: 'boolean',
                                    setting: 'fof-best-answer.enable_all_tags_reminders',
                                    label: app.translator.trans('fof-best-answer.admin.settings.enable_all_tags_reminders'),
                                    help: app.translator.trans('fof-best-answer.admin.settings.enable_all_tags_reminders_help'),
                                })}
                            </div>
                        </div>
                        <div className="GeneralPreferences">
                            <h3>{app.translator.trans('fof-best-answer.admin.settings.label.general')}</h3>
                            {this.buildSettingComponent({
                                type: 'boolean',
                                setting: 'fof-best-answer.allow_select_own_post',
                                label: app.translator.trans('fof-best-answer.admin.settings.allow_select_own_post'),
                                help: app.translator.trans('fof-best-answer.admin.settings.allow_select_own_post_help'),
                            })}
                            {this.buildSettingComponent({
                                type: 'boolean',
                                setting: 'fof-best-answer.use_alternative_ui',
                                label: app.translator.trans('fof-best-answer.admin.settings.use_alt_ui'),
                                help: app.translator.trans('fof-best-answer.admin.settings.use_alt_ui_help'),
                            })}
                        </div>
                        <hr />
                        <div className="Reminders">
                            <h3>{app.translator.trans('fof-best-answer.admin.settings.label.reminders')}</h3>
                            <p className="helpText">
                                {app.translator.trans('fof-best-answer.admin.settings.label.reminders_notice')}{' '}
                                <a href="https://docs.flarum.org/console.html#schedule-run" target="_blank">
                                    {app.translator.trans('fof-best-answer.admin.settings.documentation')}
                                </a>
                            </p>
                            {this.buildSettingComponent({
                                type: 'number',
                                setting: 'fof-best-answer.select_best_answer_reminder_days',
                                label: app.translator.trans('fof-best-answer.admin.settings.select_best_answer_reminder_days'),
                                placeholder: '0',
                                min: 0,
                                help: app.translator.trans('fof-best-answer.admin.settings.select_best_answer_reminder_days_help'),
                            })}
                        </div>
                        <hr />
                        <div className="AdvancedPreferences">
                            <h3>{app.translator.trans('fof-best-answer.admin.settings.label.advanced')}</h3>
                            {this.buildSettingComponent({
                                type: 'boolean',
                                setting: 'fof-best-answer.schedule_on_one_server',
                                label: app.translator.trans('fof-best-answer.admin.settings.schedule_on_one_server'),
                                help: app.translator.trans('fof-best-answer.admin.settings.schedule_on_one_server_help'),
                            })}
                            {this.buildSettingComponent({
                                type: 'boolean',
                                setting: 'fof-best-answer.stop_overnight',
                                label: app.translator.trans('fof-best-answer.admin.settings.schedule_stop_overnight'),
                                help: app.translator.trans('fof-best-answer.admin.settings.schedule_stop_overnight_help'),
                            })}
                            {this.buildSettingComponent({
                                type: 'boolean',
                                setting: 'fof-best-answer.store_log_output',
                                label: app.translator.trans('fof-best-answer.admin.settings.schedule_log_output'),
                            })}
                        </div>
                        {this.submitButton()}
                    </div>
                </div>
            </div>,
        ];
    }
}
