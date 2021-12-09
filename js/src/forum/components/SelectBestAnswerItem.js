import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import icon from 'flarum/common/helpers/icon';
import humanTime from 'flarum/common/helpers/humanTime';
import Link from 'flarum/common/components/Link';
import ItemList from 'flarum/common/utils/ItemList';

export default class SelectBestAnswerItem extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    const { post, discussion } = this.attrs;

    this.post = post;
    this.discussion = discussion;
  }

  view() {
    return <li className="Post--BestAnswer">{this.items().toArray()}</li>;
  }

  getSetTime(discussion) {
    if (discussion.bestAnswerSetAt() === null) {
      return;
    }
    return humanTime(discussion.bestAnswerSetAt());
  }

  items() {
    const items = new ItemList();

    items.add(
      'post',
      this.post ? (
        <span>
          {icon('fas fa-check')}
          {app.translator.trans('fof-best-answer.forum.best_answer_button')}
        </span>
      ) : (
        <Link href={app.route.post(this.post)} data-number={this.post.number()}>
          {icon('fas fa-check')}
          {app.translator.trans('fof-best-answer.forum.best_answer_button')}
        </Link>
      )
    );

    items.add(
      'user',
      <span className="BestAnswer--User">
        {app.translator.trans('fof-best-answer.forum.best_answer_label', {
          user: this.discussion.bestAnswerUser(),
          time_set: this.getSetTime(this.discussion),
          a: <a onclick={() => m.route.set(app.route.user(this.discussion.bestAnswerUser()))} />,
        })}
      </span>
    );

    return items;
  }
}
