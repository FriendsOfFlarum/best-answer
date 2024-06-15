import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import PostComponent from 'flarum/forum/components/Post';
import PostMeta from 'flarum/forum/components/PostMeta';
import username from 'flarum/common/helpers/username';
import userOnline from 'flarum/common/helpers/userOnline';
import Link from 'flarum/common/components/Link';
import classList from 'flarum/common/utils/classList';

import SelectBestAnswerItem from './components/SelectBestAnswerItem';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import Button from 'flarum/common/components/Button';

export default () => {
  extend(CommentPost.prototype, 'headerItems', function (items) {
    const post = this.attrs.post;
    const discussion = post.discussion();

    if (discussion?.hasBestAnswer() && discussion.bestAnswerPost() && discussion.bestAnswerPost().id() === post.id() && !post.isHidden()) {
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
    const post = discussion.hasBestAnswer() && discussion.bestAnswerPost();

    const maxLines = app.forum.attribute('fof-best-answer.show_max_lines');

    if (post && !post.isHidden() && thisPost.number() === 1 && !thisPost.isHidden()) {
      const user = post.user();

      items.add(
        'bestAnswerPost',
        <div className="CommentPost" onclick={() => app.current.get('stream').goToNumber(post.number())}>
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
          <div className={classList('Post-body', maxLines > 0 && 'Post-body--truncate')} style={{ '--max-lines': maxLines }}>
            {m.trust(post.contentHtml())}
          </div>
        </div>,
        -10
      );
    }
  });

  extend(PostComponent.prototype, 'elementAttrs', function (elementAttrs) {
    const post = this.attrs.post;
    const discussion = post.discussion();

    if (discussion?.hasBestAnswer() && discussion.bestAnswerPost() && discussion.bestAnswerPost().id() === post.id() && !post.isHidden()) {
      elementAttrs.className ? (elementAttrs.className += ' Post--bestAnswer') : (elementAttrs.className = 'Post--bestAnswer');
    }
  });

  extend(DiscussionPage.prototype, 'sidebarItems', function (items) {
    if (!app.forum.attribute('bestAnswerDiscussionSidebarJumpButton')) return;

    const discussion = this.discussion;
    const post = discussion.hasBestAnswer() && discussion.bestAnswerPost();

    if (post && !post.isHidden() && post.number() !== 1 && !discussion.bestAnswerPost().isHidden()) {
      items.add(
        'jumpToBestAnswer',
        <Button className="Button Button-jumpBestAnswer" icon="fas fa-check" onclick={() => app.current.get('stream').goToNumber(post.number())}>
          {app.translator.trans('fof-best-answer.forum.discussion.jump_to_best_answer_button')}
        </Button>,
        90
      );
    }
  });
};
