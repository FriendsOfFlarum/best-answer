import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';

export default class BestAnswerSettingsPage extends ExtensionPage {
  content() {
    return (
      <div className="BestAnswerSettings">
        <div className="container">
          <div className="BestAnswerSettings--content">
            <h3>{app.translator.trans('fof-best-answer.admin.settings.label.tags')}</h3>
            <p className="helpText">{app.translator.trans('fof-best-answer.admin.settings.tags_info')}</p>
            <div className="Section">
              {this.buildSettingComponent({
                type: 'flarum-tags.select-tags',
                setting: 'fof-best-answer.enabled-tags',
                label: app.translator.trans('fof-best-answer.admin.settings.enabled_tags_label'),
                help: app.translator.trans('fof-best-answer.admin.settings.enabled_tags_help'),
                options: {
                  requireParentTag: false,
                },
              })}
              {this.buildSettingComponent({
                type: 'flarum-tags.select-tags',
                setting: 'fof-best-answer.remind-tags',
                label: app.translator.trans('fof-best-answer.admin.settings.remind_tags_label'),
                help: app.translator.trans('fof-best-answer.admin.settings.remind_tags_help'),
                options: {
                  requireParentTag: false,
                },
              })}
            </div>
            <h3>{app.translator.trans('fof-best-answer.admin.settings.label.general')}</h3>
            <div className="Section">
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
              {this.buildSettingComponent({
                type: 'boolean',
                setting: 'fof-best-answer.show_filter_dropdown',
                label: app.translator.trans('fof-best-answer.admin.settings.show_filter_label'),
                help: app.translator.trans('fof-best-answer.admin.settings.show_filter_help'),
              })}
              {this.buildSettingComponent({
                type: 'number',
                setting: 'fof-best-answer.show_max_lines',
                label: app.translator.trans('fof-best-answer.admin.settings.show_max_lines_label'),
                help: app.translator.trans('fof-best-answer.admin.settings.show_max_lines_help'),
              })}
              {this.buildSettingComponent({
                type: 'flarum-tags.select-tags',
                setting: 'fof-best-answer.select_best_answer_tags',
                label: app.translator.trans('fof-best-answer.admin.settings.select_best_answer_tags_label'),
                help: app.translator.trans('fof-best-answer.admin.settings.select_best_answer_tags_help'),
                options: {
                  requireParentTag: true,
                  limits: {
                    max: {
                      primary: 0,
                    },
                  },
                },
              })}
              {this.buildSettingComponent({
                setting: 'fof-best-answer.discussion_sidebar_jump_button',
                type: 'boolean',
                label: app.translator.trans('fof-best-answer.admin.settings.discussion_sidebar_jump_button'),
                help: app.translator.trans('fof-best-answer.admin.settings.discussion_sidebar_jump_button_help'),
              })}
            </div>
            <h3>{app.translator.trans('fof-best-answer.admin.settings.label.search')}</h3>
            <div className="Section">
              {this.buildSettingComponent({
                type: 'boolean',
                setting: 'fof-best-answer.search.solution_search',
                label: app.translator.trans('fof-best-answer.admin.settings.solution_search'),
                help: app.translator.trans('fof-best-answer.admin.settings.solution_search_help'),
              })}
            </div>
            <h3>{app.translator.trans('fof-best-answer.admin.settings.label.reminders')}</h3>
            <p className="helpText">
              {app.translator.trans('fof-best-answer.admin.settings.label.reminders_notice')}{' '}
              <a href="https://docs.flarum.org/console/#schedulerun" target="_blank">
                {app.translator.trans('fof-best-answer.admin.settings.documentation')}
              </a>
            </p>
            <div className="Section">
              {this.buildSettingComponent({
                type: 'number',
                setting: 'fof-best-answer.select_best_answer_reminder_days',
                label: app.translator.trans('fof-best-answer.admin.settings.select_best_answer_reminder_days'),
                placeholder: '0',
                min: 0,
                help: app.translator.trans('fof-best-answer.admin.settings.select_best_answer_reminder_days_help'),
              })}
            </div>
            <h3>{app.translator.trans('fof-best-answer.admin.settings.label.advanced')}</h3>
            <div className="Section">
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
      </div>
    );
  }
}
