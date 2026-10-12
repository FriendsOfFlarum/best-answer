import app from 'flarum/admin/app';
import Extend from 'flarum/common/extenders';
import commonExtend from '../common/extend';

export default [
  ...commonExtend,

  new Extend.Admin()
    .customSetting(() => (
      <div className="Form-group">
        <h3>{app.translator.trans('fof-best-answer.admin.settings.label.tags')}</h3>
        <p className="helpText">{app.translator.trans('fof-best-answer.admin.settings.tags_info')}</p>
      </div>
    ))
    .setting(() => ({
      type: 'flarum-tags.select-tags',
      setting: 'fof-best-answer.enabled-tags',
      label: app.translator.trans('fof-best-answer.admin.settings.enabled_tags_label'),
      help: app.translator.trans('fof-best-answer.admin.settings.enabled_tags_help'),
      options: {
        requireParentTag: false,
      },
    }))
    .setting(() => ({
      type: 'flarum-tags.select-tags',
      setting: 'fof-best-answer.remind-tags',
      label: app.translator.trans('fof-best-answer.admin.settings.remind_tags_label'),
      help: app.translator.trans('fof-best-answer.admin.settings.remind_tags_help'),
      options: {
        requireParentTag: false,
      },
    }))
    .customSetting(() => (
      <div className="Form-group">
        <h3>{app.translator.trans('fof-best-answer.admin.settings.label.general')}</h3>
      </div>
    ))
    .setting(() => ({
      type: 'boolean',
      setting: 'fof-best-answer.use_alternative_ui',
      label: app.translator.trans('fof-best-answer.admin.settings.use_alt_ui'),
      help: app.translator.trans('fof-best-answer.admin.settings.use_alt_ui_help'),
    }))
    .setting(() => ({
      type: 'boolean',
      setting: 'fof-best-answer.show_filter_dropdown',
      label: app.translator.trans('fof-best-answer.admin.settings.show_filter_label'),
      help: app.translator.trans('fof-best-answer.admin.settings.show_filter_help'),
    }))
    .setting(() => ({
      type: 'number',
      setting: 'fof-best-answer.show_max_lines',
      label: app.translator.trans('fof-best-answer.admin.settings.show_max_lines_label'),
      help: app.translator.trans('fof-best-answer.admin.settings.show_max_lines_help'),
    }))
    .setting(() => ({
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
    }))
    .setting(() => ({
      type: 'boolean',
      setting: 'fof-best-answer.discussion_sidebar_jump_button',
      label: app.translator.trans('fof-best-answer.admin.settings.discussion_sidebar_jump_button'),
      help: app.translator.trans('fof-best-answer.admin.settings.discussion_sidebar_jump_button_help'),
    }))
    .customSetting(() => (
      <div className="Form-group">
        <h3>{app.translator.trans('fof-best-answer.admin.settings.label.search')}</h3>
      </div>
    ))
    .setting(() => ({
      type: 'boolean',
      setting: 'fof-best-answer.search.solution_search',
      label: app.translator.trans('fof-best-answer.admin.settings.solution_search'),
      help: app.translator.trans('fof-best-answer.admin.settings.solution_search_help'),
    }))
    .setting(() => ({
      type: 'boolean',
      setting: 'fof-best-answer.search.remove_solutions_from_main_search',
      label: app.translator.trans('fof-best-answer.admin.settings.remove_solutions_from_main_search'),
      help: app.translator.trans('fof-best-answer.admin.settings.remove_solutions_from_main_search_help'),
    }))
    .setting(() => ({
      type: 'boolean',
      setting: 'fof-best-answer.search.display_tags',
      label: app.translator.trans('fof-best-answer.admin.settings.display_tags'),
      help: app.translator.trans('fof-best-answer.admin.settings.display_tags_help'),
    }))
    .customSetting(() => (
      <div className="Form-group">
        <h3>{app.translator.trans('fof-best-answer.admin.settings.label.reminders')}</h3>
        <p className="helpText">
          {app.translator.trans('fof-best-answer.admin.settings.label.reminders_notice')}{' '}
          <a href="https://docs.flarum.org/console/#schedule" target="_blank">
            {app.translator.trans('fof-best-answer.admin.settings.documentation')}
          </a>
        </p>
      </div>
    ))
    .setting(() => ({
      type: 'number',
      setting: 'fof-best-answer.select_best_answer_reminder_days',
      label: app.translator.trans('fof-best-answer.admin.settings.select_best_answer_reminder_days'),
      help: app.translator.trans('fof-best-answer.admin.settings.select_best_answer_reminder_days_help'),
      placeholder: '0',
      min: 0,
    }))
    .customSetting(() => (
      <div className="Form-group">
        <h3>{app.translator.trans('fof-best-answer.admin.settings.label.advanced')}</h3>
      </div>
    ))
    .setting(() => ({
      type: 'boolean',
      setting: 'fof-best-answer.stop_overnight',
      label: app.translator.trans('fof-best-answer.admin.settings.schedule_stop_overnight'),
      help: app.translator.trans('fof-best-answer.admin.settings.schedule_stop_overnight_help'),
    }))
    .setting(() => ({
      type: 'boolean',
      setting: 'fof-best-answer.store_log_output',
      label: app.translator.trans('fof-best-answer.admin.settings.schedule_log_output'),
    }))
    .permission(
      () => ({
        icon: 'far fa-comment',
        label: app.translator.trans('fof-best-answer.admin.permissions.best_answer'),
        permission: 'discussion.selectBestAnswerOwnDiscussion',
      }),
      'reply'
    )
    .permission(
      () => ({
        icon: 'far fa-comment',
        label: app.translator.trans('fof-best-answer.admin.permissions.best_answer_not_own_discussion'),
        permission: 'discussion.selectBestAnswerNotOwnDiscussion',
      }),
      'reply'
    )
    .permission(
      () => ({
        icon: 'fas fa-check',
        label: app.translator.trans('fof-best-answer.admin.permissions.allow_select_own_post'),
        permission: 'discussion.fof-best-answer.allow_select_own_post',
      }),
      'reply'
    ),
] satisfies object[];
