import ExtensionPage from 'flarum/components/ExtensionPage';
import { settings } from '@fof-components';

const {
    items: { BooleanItem, SelectItem, StringItem, NumberItem },
} = settings;

export default class BestAnswerSettings extends ExtensionPage {
    oninit(vnode) {
        super.oninit(vnode);

        this.setting = this.setting.bind(this);
    }

    content() {
        return [
            <div className="container">
                <div className="BestAnswerSettingsPage">
                    <div className="GeneralPreferences">
                        <label>{app.translator.trans('fof-best-answer.admin.settings.label.general')}</label>
                        <div className="Form-group">
                            <BooleanItem name="fof-best-answer.allow_select_own_post" setting={this.setting}>
                                {app.translator.trans('fof-best-answer.admin.settings.allow_select_own_post')}
                            </BooleanItem>
                        </div>
                        <div className="Form-group">
                            <BooleanItem name="fof-best-answer.use_alternative_ui" setting={this.setting}>
                                {app.translator.trans('fof-best-answer.admin.settings.use_alt_ui')}
                            </BooleanItem>
                        </div>
                    </div>
                    <hr />
                    <div className="Reminders">
                        <label>{app.translator.trans('fof-best-answer.admin.settings.label.reminders')}</label>
                        <div className="Form-group">
                            <NumberItem name="fof-best-answer.select_best_answer_reminder_days" placeholder="0" min="0" setting={this.setting}>
                                {app.translator.trans('fof-best-answer.admin.settings.select_best_answer_reminder_days')}
                            </NumberItem>
                        </div>
                        <div className="Form-group">
                            <StringItem name="fof-best-answer.remind_tag_ids" setting={this.setting}>
                                {app.translator.trans('fof-best-answer.admin.settings.remind_tag_ids')}
                            </StringItem>
                        </div>
                        <p>{app.translator.trans('fof-best-answer.admin.settings.label.reminders_notice')}</p>
                    </div>
                    <hr />
                    <div className="AdvancedPreferences">
                        <label>{app.translator.trans('fof-best-answer.admin.settings.label.advanced')}</label>
                        <div className="Form-group">
                            <BooleanItem name="fof-best-answer.schedule_on_one_server" setting={this.setting}>
                                {app.translator.trans('fof-best-answer.admin.settings.schedule_on_one_server')}
                            </BooleanItem>
                        </div>
                        <div className="Form-group">
                            <BooleanItem name="fof-best-answer.stop_overnight" setting={this.setting}>
                                {app.translator.trans('fof-best-answer.admin.settings.schedule_stop_overnight')}
                            </BooleanItem>
                        </div>
                        <div className="Form-group">
                            <BooleanItem name="fof-best-answer.store_log_output" setting={this.setting}>
                                {app.translator.trans('fof-best-answer.admin.settings.schedule_log_output')}
                            </BooleanItem>
                        </div>
                    </div>
                    {this.submitButton()}
                </div>
            </div>,
        ];
    }
}
