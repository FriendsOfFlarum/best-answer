import app from 'flarum/admin/app';
import Extend from 'flarum/common/extenders';
import BestAnswerSettingsPage from './components/BestAnswerSettingsPage';
import commonExtend from '../common/extend';

export default [
  ...commonExtend,

  new Extend.Admin()
    .page(BestAnswerSettingsPage)
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
        icon : 'fas fa-check',
        label: app.translator.trans('fof-best-answer.admin.permissions.allow_select_own_post'),
        permission: 'discussion.fof-best-answer.allow_select_own_post'
      }),
      'reply'
    ),
];
