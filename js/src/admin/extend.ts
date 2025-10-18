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
    ),
];
