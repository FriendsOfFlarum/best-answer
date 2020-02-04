import Component from 'flarum/Component';
import icon from 'flarum/helpers/icon';
import humanTime from 'flarum/helpers/humanTime';

export default class SelectBestAnswerItem extends Component {
    view() {
        const { post, discussion } = this.props;

        return (
            <div className="Post--BestAnswer">
                {post ? (
                    <span>
                        {icon('fas fa-check')}
                        {app.translator.trans('fof-best-answer.forum.best_answer_button')}
                    </span>
                ) : (
                    <a href={app.route.post(post)} config={m.route} data-number={post.number()}>
                        {icon('fas fa-check')}
                        {app.translator.trans('fof-best-answer.forum.best_answer_button')}
                    </a>
                )}

                <span className="BestAnswer--User">
                    {app.translator.trans('fof-best-answer.forum.best_answer_label', {
                        user: discussion.bestAnswerUser(),
                        time_set: this.getSetTime(discussion),
                        a: <a onclick={() => m.route(app.route.user(discussion.bestAnswerUser()))} />,
                    })}
                </span>
            </div>
        );
    }

    getSetTime(discussion) {
        if (discussion.bestAnswerSetAt() === null) {
            return;
        }
        return humanTime(discussion.bestAnswerSetAt());
    }
}
