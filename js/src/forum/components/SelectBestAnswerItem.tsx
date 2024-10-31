import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import icon from 'flarum/common/helpers/icon';
import humanTime from 'flarum/common/helpers/humanTime';
import Link from 'flarum/common/components/Link';
import ItemList from 'flarum/common/utils/ItemList';
import Discussion from 'flarum/common/models/Discussion';
import Mithril from 'mithril';
import Post from 'flarum/common/models/Post';

export interface ISelectBestAnswerItemAttrs extends ComponentAttrs {
  post: Post;
  discussion: Discussion;
}

export default class SelectBestAnswerItem extends Component<ISelectBestAnswerItemAttrs> {
  post!: Post;
  discussion!: Discussion;

  oninit(vnode: Mithril.Vnode<ISelectBestAnswerItemAttrs, this>) {
    super.oninit(vnode);

    this.post = this.attrs.post;
    this.discussion = this.attrs.discussion;
  }

  view() {
    return <li className="Post--BestAnswer">{this.items().toArray()}</li>;
  }

  getSetTime(discussion: Discussion) {
    if (!discussion.bestAnswerSetAt?.()) {
      return;
    }
    const bestAnswerSetAt = discussion.bestAnswerSetAt?.();
    if (!bestAnswerSetAt) {
      return;
    }
    return humanTime(bestAnswerSetAt);
  }

  items(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    items.add(
      'post',
      this.post ? (
        <span>
          {icon('fas fa-check')}
          {app.translator.trans('fof-best-answer.forum.best_answer_button')}
        </span>
      ) : (
        <Link href={app.route.post(this.post as Post)} data-number={(this.post as Post).number()}>
          {icon('fas fa-check')}
          {app.translator.trans('fof-best-answer.forum.best_answer_button')}
        </Link>
      )
    );

    const bestAnswerUser = this.discussion.bestAnswerUser?.();

    bestAnswerUser &&
      items.add(
        'user',
        <span className="BestAnswer--User">
          {app.translator.trans('fof-best-answer.forum.best_answer_label', {
            user: this.discussion.bestAnswerUser?.(),
            time_set: this.getSetTime(this.discussion),
            a: <a onclick={() => m.route.set(app.route.user(bestAnswerUser))} />,
          })}
        </span>
      );

    return items;
  }
}
