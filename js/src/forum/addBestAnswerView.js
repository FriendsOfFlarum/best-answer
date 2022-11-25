import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import PostComponent from 'flarum/forum/components/Post';
import PostMeta from 'flarum/forum/components/PostMeta';
import username from 'flarum/common/helpers/username';
import userOnline from 'flarum/common/helpers/userOnline';
import Link from 'flarum/common/components/Link';

import SelectBestAnswerItem from './components/SelectBestAnswerItem';

export default () => {
  extend(CommentPost.prototype, 'headerItems', function (items) {
    const post = this.attrs.post;
    const answers = post.discussion().bestAnswers();
    const isAnswer = answers && answers.some((p) => p.id() === post.id());

    if (isAnswer && !post.isHidden()) {
      items.add(
        'isBestAnswer',
        SelectBestAnswerItem.component({
          post,
          discussion: post.discussion(),
        })
      );
    }
  });

  extend(CommentPost.prototype, 'footerItems', function (items) {
    const thisPost = this.attrs.post;
    const discussion = thisPost.discussion();
    //const post = discussion.bestAnswerPost();
    const answers = discussion.bestAnswers();

    if (thisPost.number() === 1 && !thisPost.isHidden()) {
      answers.forEach((post) => {
        const user = post.user();

        items.add(
          `bestAnswerPost-${post.id()}`,
          <div className={`CommentPost bestAnswerPost`} onclick={() => app.current.get('stream').goToNumber(post.number())}>
            <div className="Post-header">
              <ul>
                <li className="item-user">
                  <div className="PostUser">
                    {user && userOnline(user)}
                    <h3>{user ? <Link href={app.route.user(user)}>{username(user)}</Link> : username(user)}</h3>
                  </div>
                </li>
                {post.discussion() && <li className="item-meta">{PostMeta.component({ post })}</li>}
                {SelectBestAnswerItem.component({
                  post,
                  discussion,
                })}
              </ul>
            </div>
            <div className="Post-body">{m.trust(post.contentHtml())}</div>
          </div>,
          -10
        );
      });
    }
  });

  extend(PostComponent.prototype, 'elementAttrs', function (elementAttrs) {
    const post = this.attrs.post;
    const answers = post.discussion().bestAnswers();
    const isBestAnswer = answers && answers.some((p) => p.id() === post.id());
    if (isBestAnswer && !post.isHidden()) {
      elementAttrs.className ? (elementAttrs.className += ' Post--bestAnswer') : (elementAttrs.className = 'Post--bestAnswer');
    }
  });
};
