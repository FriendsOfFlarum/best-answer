import app from 'flarum/admin/app';
import ExtensionPage, { ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import Button from 'flarum/common/components/Button';
import Link from 'flarum/common/components/Link';

export default class BestAnswerSettings extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);

    this.loading = false;
  }

  enableAllTags() {
    this.enable('enableAllTags');
  }

  enableAllReminders() {
    this.enable('enableAllReminders');
  }

  enable(feature) {
    this.loading = true;

    app
      .request({
        method: 'POST',
        url: app.forum.attribute('apiUrl') + '/fof/best-answer/enable',
        body: {
          feature,
        },
      })
      .then(() => {
        this.loading = false;
        m.redraw();
      });
  }

  content() {
    return [
      <div className="container">
        <div className="BestAnswerSettingsPage">
          <div className="Form">
            <div className="Introduction">
              <h3>{app.translator.trans('fof-best-answer.admin.settings.label.tags')}</h3>
              <p className="helpText">{app.translator.trans('fof-best-answer.admin.settings.tags_info')}</p>
              {this.buildSettingComponent({
                type: 'flarum-tags.select-tags',
                setting: 'fof-best-answer.enabled-tags',
                label: app.translator.trans('fof-best-answer.admin.settings.enabled_tags_label'),
                help: app.translator.trans('fof-best-answer.admin.settings.enabled_tags_help'),
                options: {
                  requireParentTag: false,
                  limits: {
                    max: {
                      secondary: 0,
                    },
                  },
                },
              })}
              {this.buildSettingComponent({
                type: 'flarum-tags.select-tags',
                setting: 'fof-best-answer.remind-tags',
                label: app.translator.trans('fof-best-answer.admin.settings.remind_tags_label'),
                help: app.translator.trans('fof-best-answer.admin.settings.remind_tags_help'),
                options: {
                  requireParentTag: false,
                  limits: {
                    max: {
                      secondary: 0,
                    },
                  },
                },
              })}
            </div>
            <hr />
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
            </div>
            <hr />
            <div className="Search">
              <h3>{app.translator.trans('fof-best-answer.admin.settings.label.search')}</h3>
              {this.buildSettingComponent({
                type: 'boolean',
                setting: 'fof-best-answer.search.solution_search',
                label: app.translator.trans('fof-best-answer.admin.settings.solution_search'),
                help: app.translator.trans('fof-best-answer.admin.settings.solution_search_help'),
              })}
            </div>
            <hr />
            <div className="Reminders">
              <h3>{app.translator.trans('fof-best-answer.admin.settings.label.reminders')}</h3>
              <p className="helpText">
                {app.translator.trans('fof-best-answer.admin.settings.label.reminders_notice')}{' '}
                <a href="https://docs.flarum.org/console/#schedulerun" target="_blank">
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
