import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import PostControls from 'flarum/forum/utils/PostControls';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import CommentPost from 'flarum/forum/components/CommentPost';

export default () => {
  const isThisBestAnswer = (discussion, post) => {
    const answers = discussion.bestAnswers();

    return answers && answers.some((p) => p.id() === post.id());
  };

  const actionLabel = (isBestAnswer) => {
    return app.translator.trans(isBestAnswer ? 'fof-best-answer.forum.remove_best_answer' : 'fof-best-answer.forum.this_best_answer');
  };

  const saveDiscussion = (discussion, isBestAnswer, post) => {
    discussion
      .save({
        bestAnswerPostId: post.id(),
      })
      .then(() => {
        if (app.current.matches(DiscussionPage)) {
          app.current.get('stream').update();
        }

        m.redraw();

        if (isBestAnswer) {
          m.route.set(app.route.discussion(discussion));
        }
      });
  };

  extend(PostControls, 'moderationControls', function (items, post) {
    if (app.forum.attribute('useAlternativeBestAnswerUi')) return;

    const discussion = post.discussion();
    let isBestAnswer = isThisBestAnswer(discussion, post);

    post.pushAttributes({ isBestAnswer });

    if (!post.canSelectAsBestAnswer()) return;

    items.add(
      'bestAnswer',
      <Button
        icon="fas fa-comment-dots"
        onclick={() => {
          isBestAnswer = !isBestAnswer;
          saveDiscussion(discussion, isBestAnswer, post);
        }}
      >
        {actionLabel(isBestAnswer)}
      </Button>
    );
  });

  extend(CommentPost.prototype, 'actionItems', function (items) {
    if (!app.forum.attribute('useAlternativeBestAnswerUi')) return;

    const post = this.attrs.post;
    const discussion = this.attrs.post.discussion();
    let isBestAnswer = isThisBestAnswer(discussion, post);

    post.pushAttributes({ isBestAnswer });

    if (!post.canSelectAsBestAnswer()) return;

    items.add(
      'bestAnswer',
      <Button
        className={!isThisBestAnswer(discussion, post) ? 'Button Button--primary' : isBestAnswer ? 'Button Button--primary' : 'Button Button--link'}
        onclick={() => {
          isBestAnswer = !isBestAnswer;
          saveDiscussion(discussion, isBestAnswer, post);
        }}
      >
        {actionLabel(isBestAnswer)}
      </Button>
    );
  });
};
