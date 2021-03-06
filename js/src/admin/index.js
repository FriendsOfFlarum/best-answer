import app from 'flarum/app';
import BestAnswerSettings from './components/BestAnswerSettings';

app.initializers.add('fof-best-answer', () => {
    app.extensionData
        .for('fof-best-answer')
        .registerPage(BestAnswerSettings)
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
});
