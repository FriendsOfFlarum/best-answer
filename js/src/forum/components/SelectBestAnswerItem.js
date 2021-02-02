import Component from 'flarum/Component';
import icon from 'flarum/helpers/icon';
import humanTime from 'flarum/helpers/humanTime';
import Link from 'flarum/components/Link';

export default class SelectBestAnswerItem extends Component {
    view() {
        const { post, discussion } = this.attrs;

        return (
            <li className="Post--BestAnswer">
                {post ? (
                    <span>
                        {icon('fas fa-check')}
                        {app.translator.trans('fof-best-answer.forum.best_answer_button')}
                    </span>
                ) : (
                    <Link href={app.route.post(post)} data-number={post.number()}>
                        {icon('fas fa-check')}
                        {app.translator.trans('fof-best-answer.forum.best_answer_button')}
                    </Link>
                )}

                <span className="BestAnswer--User">
                    {app.translator.trans('fof-best-answer.forum.best_answer_label', {
                        user: discussion.bestAnswerUser(),
                        time_set: this.getSetTime(discussion),
                        a: <a onclick={() => m.route.set(app.route.user(discussion.bestAnswerUser()))} />,
                    })}
                </span>
            </li>
        );
    }

    getSetTime(discussion) {
        if (discussion.bestAnswerSetAt() === null) {
            return;
        }
        return humanTime(discussion.bestAnswerSetAt());
    }
}
