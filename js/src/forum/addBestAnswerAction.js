import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import PostControls from 'flarum/forum/utils/PostControls';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import CommentPost from 'flarum/forum/components/CommentPost';

export default () => {
  const ineligible = (discussion, post) => {
    return post.isHidden() || post.number() === 1 || !discussion.canSelectBestAnswer() || !app.session.user;
  };

  const blockSelectOwnPost = (post) => {
    return !app.forum.attribute('canSelectBestAnswerOwnPost') && post.user() && post.user().id() === app.session.user.id();
  };

  const isThisBestAnswer = (discussion, post) => {
    return discussion.hasBestAnswer() && discussion.bestAnswerPost() && discussion.bestAnswerPost().id() === post.id();
  };

  const actionLabel = (isBestAnswer) => {
    return app.translator.trans(isBestAnswer ? 'fof-best-answer.forum.remove_best_answer' : 'fof-best-answer.forum.this_best_answer');
  };

  const saveDiscussion = (discussion, isBestAnswer, post) =>
    discussion
      .save(
        {
          bestAnswerPostId: isBestAnswer ? post.id() : 0,
          bestAnswerUserId: app.session.user.id(),
          relationships: isBestAnswer ? { bestAnswerPost: post, bestAnswerUser: app.session.user } : { bestAnswerPost: null },
        },
        {
          params: {
            include: 'tags',
          },
        }
      )
      .then(() => {
        if (!isBestAnswer) {
          delete discussion.data.relationships.bestAnswerPost;
          delete discussion.data.relationships.bestAnswerUser;
        }

        if (app.current.matches(DiscussionPage)) {
          app.current.get('stream').update();
        }

        m.redraw();

        if (isBestAnswer) {
          m.route.set(app.route.discussion(discussion));
        }
      });

  extend(PostControls, 'moderationControls', function (items, post) {
    if (app.forum.attribute('useAlternativeBestAnswerUi')) return;

    const discussion = post.discussion();
    let isBestAnswer = isThisBestAnswer(discussion, post);

    post.pushAttributes({ isBestAnswer });

    if (post.contentType() !== 'comment') return;

    if (ineligible(discussion, post) || blockSelectOwnPost(post) || !app.current.matches(DiscussionPage)) return;

    items.add(
      'bestAnswer',
      Button.component(
        {
          icon: `fa${isBestAnswer ? 's' : 'r'} fa-comment-dots`,
          onclick: () => {
            isBestAnswer = !isBestAnswer;

            saveDiscussion(discussion, isBestAnswer, post).finally(() => {
              isBestAnswer = isThisBestAnswer(discussion, post);
            });
          },
        },
        actionLabel(isBestAnswer)
      )
    );
  });

  extend(CommentPost.prototype, 'actionItems', function (items) {
    if (!app.forum.attribute('useAlternativeBestAnswerUi')) return;

    const post = this.attrs.post;
    const discussion = this.attrs.post.discussion();
    let isBestAnswer = isThisBestAnswer(discussion, post);
    let hasBestAnswer = discussion.bestAnswerPost() !== false;

    post.pushAttributes({ isBestAnswer });

    if (ineligible(discussion, post) || blockSelectOwnPost(post) || !app.current.matches(DiscussionPage)) return;

    items.add(
      'bestAnswer',
      Button.component(
        {
          className: `Button Button--${!hasBestAnswer || isBestAnswer ? 'primary' : 'link'}`,
          onclick: function onclick() {
            hasBestAnswer = !hasBestAnswer;
            isBestAnswer = !isBestAnswer;

            saveDiscussion(discussion, isBestAnswer, post).finally(() => {
              hasBestAnswer = discussion.hasBestAnswer() && discussion.bestAnswerPost() !== false;
              isBestAnswer = isThisBestAnswer(discussion, post);
            });
          },
        },
        actionLabel(isBestAnswer)
      )
    );
  });
};
