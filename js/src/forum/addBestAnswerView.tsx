import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import PostComponent from 'flarum/forum/components/Post';
import SelectBestAnswerItem from './components/SelectBestAnswerItem';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import Button from 'flarum/common/components/Button';
import BestAnswerFooterPreview from './components/BestAnswerFooterPreview';

export default () => {
  // Posts only redraw when their own freshness changes; the best answer lives on the discussion.
  extend(CommentPost.prototype, 'oninit', function () {
    this.subtree.check(() => {
      const discussion = this.attrs.post.discussion();
      // hasOne() returns false, not null, when the relationship is empty.
      const bestAnswer = discussion && discussion.hasBestAnswer() && discussion.bestAnswerPost();

      return bestAnswer ? bestAnswer.id() : false;
    });

    // The first post previews the best answer, so it also redraws when that answer is edited or hidden.
    if (this.attrs.post.number() === 1) {
      this.subtree.check(() => {
        const discussion = this.attrs.post.discussion();
        const bestAnswer = discussion && discussion.hasBestAnswer() && discussion.bestAnswerPost();

        return bestAnswer ? bestAnswer.freshness : false;
      });
    }
  });

  extend(CommentPost.prototype, 'headerItems', function (items) {
    const post = this.attrs.post;
    const discussion = post.discussion();
    const bestAnswer = discussion?.hasBestAnswer() && discussion.bestAnswerPost();

    if (bestAnswer && bestAnswer.id() === post.id() && !post.isHidden()) {
      items.add('isBestAnswer', <SelectBestAnswerItem post={post} discussion={discussion} />, -100);
    }
  });

  extend(CommentPost.prototype, 'footerItems', function (items) {
    const thisPost = this.attrs.post;
    const discussion = thisPost.discussion();
    const post = discussion.hasBestAnswer() && discussion.bestAnswerPost();

    if (post && !post.isHidden() && thisPost.number() === 1 && !thisPost.isHidden()) {
      const user = post.user();

      items.add('bestAnswerPost', <BestAnswerFooterPreview post={post} user={user} discussion={discussion} />, -10);
    }
  });

  extend(PostComponent.prototype, 'elementAttrs', function (elementAttrs) {
    const post = this.attrs.post;
    const discussion = post.discussion();
    const bestAnswer = discussion?.hasBestAnswer() && discussion.bestAnswerPost();

    if (bestAnswer && bestAnswer.id() === post.id() && !post.isHidden()) {
      elementAttrs.className ? (elementAttrs.className += ' Post--bestAnswer') : (elementAttrs.className = 'Post--bestAnswer');
    }
  });

  extend(DiscussionPage.prototype, 'sidebarItems', function (items) {
    if (!app.forum.attribute<boolean>('bestAnswerDiscussionSidebarJumpButton')) return;

    // @ts-ignore
    const discussion = this.discussion;

    if (discussion === null) return;

    const post = discussion.hasBestAnswer() && discussion.bestAnswerPost();

    if (post && !post.isHidden() && post.number() !== 1) {
      items.add(
        'jumpToBestAnswer',
        <Button
          className="Button Button-jumpBestAnswer"
          icon="fas fa-check"
          onclick={() => app.current.get('stream').goToNumber(post.number())}
          aria-label={app.translator.trans('fof-best-answer.forum.discussion.jump_to_best_answer_button')}
        >
          {app.translator.trans('fof-best-answer.forum.discussion.jump_to_best_answer_button')}
        </Button>,
        90
      );
    }
  });
};
