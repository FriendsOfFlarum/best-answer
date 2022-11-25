import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import icon from 'flarum/common/helpers/icon';
import humanTime from 'flarum/common/helpers/humanTime';
import Link from 'flarum/common/components/Link';
import ItemList from 'flarum/common/utils/ItemList';
import Post from 'flarum/common/models/Post';
import Discussion from 'flarum/common/models/Discussion';
import type Mithril from 'mithril';

interface IAttrs {
  post: Post;
  discussion: Discussion;
}

export default class SelectBestAnswerItem extends Component<IAttrs> {
  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);
  }

  view() {
    return <li className="Post--BestAnswer">{this.items().toArray()}</li>;
  }

  getSetTime(post: Post) {
    if (post.solutionSetAt() === null) {
      return;
    }
    return humanTime(post.solutionSetAt());
  }

  items(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();
    const user = this.attrs.post.solutionSetBy();

    items.add(
      'post',
      this.post ? (
        <span>
          {icon('fas fa-check')}
          {app.translator.trans('fof-best-answer.forum.best_answer_button')}
        </span>
      ) : (
        <Link href={app.route.post(this.attrs.post)} data-number={this.attrs.post.number()}>
          {icon('fas fa-check')}
          {app.translator.trans('fof-best-answer.forum.best_answer_button')}
        </Link>
      )
    );

    items.add(
      'user',
      <span className="BestAnswer--User">
        {app.translator.trans('fof-best-answer.forum.best_answer_label', {
          user: user,
          time_set: this.getSetTime(this.attrs.post),
          a: <a onclick={() => m.route.set(app.route.user(user))} />,
        })}
      </span>
    );

    return items;
  }
}
