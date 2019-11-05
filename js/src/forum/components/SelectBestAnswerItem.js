import Component from 'flarum/Component';
import icon from 'flarum/helpers/icon';

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
                        a: <a onclick={() => m.route(app.route.user(discussion.bestAnswerUser()))} />,
                    })}
                </span>
            </div>
        );
    }
}
