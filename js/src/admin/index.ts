import app from 'flarum/admin/app';
import addBestAnswerCountSort from '../common/addBestAnswerCountSort';
import BestAnswerSettingsPage from './components/BestAnswerSettingsPage';

export { default as extend } from './extend';

app.initializers.add(
  'fof-best-answer',
  () => {
    app.extensionData
      .for('fof-best-answer')
      .registerPage(BestAnswerSettingsPage)
      .registerPermission(
        {
          icon: 'far fa-comment',
          label: app.translator.trans('fof-best-answer.admin.permissions.best_answer'),
          permission: 'discussion.selectBestAnswerOwnDiscussion',
        },
        'reply'
      )
      .registerPermission(
        {
          icon: 'far fa-comment',
          label: app.translator.trans('fof-best-answer.admin.permissions.best_answer_not_own_discussion'),
          permission: 'discussion.selectBestAnswerNotOwnDiscussion',
        },
        'reply'
      );

    addBestAnswerCountSort();
  },
  5
);
