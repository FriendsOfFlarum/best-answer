import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Mithril from 'mithril';
import username from 'flarum/common/helpers/username';
import userOnline from 'flarum/common/helpers/userOnline';
import PostMeta from 'flarum/forum/components/PostMeta';
import Link from 'flarum/common/components/Link';
import classList from 'flarum/common/utils/classList';
import SelectBestAnswerItem from './SelectBestAnswerItem';
import Post from 'flarum/common/models/Post';
import User from 'flarum/common/models/User';
import ItemList from 'flarum/common/utils/ItemList';

export interface BestAnswerFooterPreviewAttrs extends ComponentAttrs {
  post: Post;
  user: User;
}

export default class BestAnswerFooterPreview extends Component<BestAnswerFooterPreviewAttrs> {
  user!: User;
  post!: Post;

  oninit(vnode: Mithril.Vnode<BestAnswerFooterPreviewAttrs, this>) {
    super.oninit(vnode);

    this.user = this.attrs.user;
    this.post = this.attrs.post;
  }

  view() {
    const maxLines = app.forum.attribute<number>('fof-best-answer.show_max_lines');

    return (
      <div className="CommentPost" onclick={() => app.current.get('stream').goToNumber(this.post.number())}>
        <div className="Post-header">
          <ul>{this.headerItems().toArray()}</ul>
        </div>
        <div className={classList('Post-body', maxLines > 0 && 'Post-body--truncate')} style={{ '--max-lines': maxLines }}>
          {m.trust(this.postContent())}
        </div>
      </div>
    );
  }

  postContent() {
    return this.post.contentHtml();
  }

  /**
   * To maintain compatibility with existing styling, custom themes, etc, each item here must be
   * wrapped in a <li> element.
   *
   * @todo: Remove this requirement for Flarum 2.0
   */
  headerItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    items.add('user', this.userItem());
    this.post.discussion() && items.add('meta', this.metaItem());
    items.add('bestAnswer', <SelectBestAnswerItem post={this.post} discussion={this.post.discussion()} />);

    return items;
  }

  userItem(): Mithril.Children {
    return (
      <li className="item-user">
        <div className="PostUser">
          {this.user && userOnline(this.user)}
          <h3>{this.user ? <Link href={app.route.user(this.user)}>{username(this.user)}</Link> : username(this.user)}</h3>
        </div>
      </li>
    );
  }

  metaItem(): Mithril.Children {
    return (
      <li className="item-meta">
        <PostMeta post={this.post} />
      </li>
    );
  }
}
