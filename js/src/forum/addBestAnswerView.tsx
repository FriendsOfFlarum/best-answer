import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import PostComponent from 'flarum/forum/components/Post';
import SelectBestAnswerItem from './components/SelectBestAnswerItem';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import Button from 'flarum/common/components/Button';
import BestAnswerFooterPreview from './components/BestAnswerFooterPreview';

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

    if (post && !post.isHidden() && thisPost.number() === 1 && !thisPost.isHidden()) {
      const user = post.user();

      items.add('bestAnswerPost', <BestAnswerFooterPreview post={post} user={user} />, -10);
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
    if (!app.forum.attribute<boolean>('bestAnswerDiscussionSidebarJumpButton')) return;

    /** @ts-ignore */
    const discussion = this.discussion;

    if (!discussion) return;

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
