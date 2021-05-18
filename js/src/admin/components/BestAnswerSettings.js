import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import { settings } from '@fof-components';

const {
    items: { BooleanItem, SelectItem, StringItem, NumberItem },
} = settings;

export default class BestAnswerSettings extends ExtensionPage {
    oninit(vnode) {
        super.oninit(vnode);

        this.setting = this.setting.bind(this);
    }

    // Not yet used. Planned for multi-select dropdown of tag selection
    getTags() {
        return app.store.all('tags').reduce((o, g) => {
            o[g.id()] = g.name();

            return o;
        }, {});
    }

    content() {
        const tags = app.store.all('tags');

        return [
            <div className="container">
                <div className="BestAnswerSettingsPage">
                    <div className="GeneralPreferences">
                        <h3>{app.translator.trans('fof-best-answer.admin.settings.label.general')}</h3>
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
                        <h3>{app.translator.trans('fof-best-answer.admin.settings.label.reminders')}</h3>
                        <p>
                            {app.translator.trans('fof-best-answer.admin.settings.label.reminders_notice')}{' '}
                            <a href="https://docs.flarum.org/console.html#default-commands" target="_blank">
                                Flarum Scheduler Info
                            </a>
                        </p>
                        <div className="Form-group">
                            <NumberItem name="fof-best-answer.select_best_answer_reminder_days" placeholder="0" min="0" setting={this.setting}>
                                {app.translator.trans('fof-best-answer.admin.settings.select_best_answer_reminder_days')}
                            </NumberItem>
                        </div>
                        <div className="Form-group">
                            <StringItem name="fof-best-answer.remind_tag_ids" setting={this.setting}>
                                {app.translator.trans('fof-best-answer.admin.settings.remind_tag_ids')}
                            </StringItem>
                            <ul>
                                {tags.map(function (tag) {
                                    return [
                                        <li>
                                            {tag.name()} <code>{tag.id()}</code>
                                        </li>,
                                    ];
                                })}
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="AdvancedPreferences">
                        <h3>{app.translator.trans('fof-best-answer.admin.settings.label.advanced')}</h3>
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
