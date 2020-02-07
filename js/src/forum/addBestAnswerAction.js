import { extend } from 'flarum/extend';
import Button from 'flarum/components/Button';
import PostControls from 'flarum/utils/PostControls';
import DiscussionPage from 'flarum/components/DiscussionPage';
import CommentPost from 'flarum/components/CommentPost';

export default () => {
    extend(PostControls, 'moderationControls', function (items, post) {
        if (app.forum.attribute('useAlternativeBestAnswerUi')) return;

        const discussion = post.discussion();
        let isBestAnswer = discussion.bestAnswerPost() && discussion.bestAnswerPost().id() === post.id();

        post.pushAttributes({ isBestAnswer });

        if (post.isHidden() || post.number() === 1 || !discussion.canSelectBestAnswer() || !app.session.user) return;

        if (!app.forum.attribute('canSelectBestAnswerOwnPost') && post.user() && post.user().id() === app.session.user.id()) return;

        items.add(
            'bestAnswer',
            Button.component({
                children: app.translator.trans(isBestAnswer ? 'fof-best-answer.forum.remove_best_answer' : 'fof-best-answer.forum.this_best_answer'),
                icon: `fa${isBestAnswer ? 's' : 'r'} fa-comment-dots`,
                onclick: () => {
                    isBestAnswer = !isBestAnswer;

                    discussion
                        .save({
                            bestAnswerPostId: isBestAnswer ? post.id() : 0,
                            bestAnswerUserId: app.session.user.id(),
                            relationships: isBestAnswer
                                ? { bestAnswerPost: post, bestAnswerUser: app.session.user }
                                : delete discussion.data.relationships.bestAnswerPost,
                        })
                        .then(() => {
                            if (app.current instanceof DiscussionPage) {
                                app.current.stream.update();
                            }

                            m.redraw();

                            if (isBestAnswer) {
                                m.route(app.route.discussion(discussion));
                            }
                        });
                },
            })
        );
    });

    extend(CommentPost.prototype, 'actionItems', function (items) {
        if (!app.forum.attribute('useAlternativeBestAnswerUi')) return;

        const post = this.props.post;
        const discussion = this.props.post.discussion();
        let isBestAnswer = discussion.bestAnswerPost() && discussion.bestAnswerPost().id() === post.id();
        let hasBestAnswer = discussion.bestAnswerPost() !== false;

        post.pushAttributes({ isBestAnswer });

        if (post.isHidden() || post.number() === 1 || !discussion.canSelectBestAnswer() || !app.session.user) return;

        if (discussion.startUserId() === Number.parseInt(app.session.user.id()) && discussion.canSelectBestAnswer()) {
            commonItem(items, post, discussion, isBestAnswer);
        }

        if (!discussion.canSelectBestAnswer()
            || discussion.startUserId() === Number.parseInt(app.session.user.id())) return;

        commonItem(items, post, discussion, isBestAnswer, hasBestAnswer);

    });

    const commonItem = (items, post, discussion, isBestAnswer, hasBestAnswer) => {
        items.add(
            'bestAnswer',
            Button.component({
                children: app.translator.trans(
                    isBestAnswer ? 'fof-best-answer.forum.remove_best_answer' : 'fof-best-answer.forum.this_best_answer'
                ),
                className: !hasBestAnswer ? 'Button Button--primary' : (isBestAnswer ? 'Button Button--primary' : 'Button Button--link'),
                onclick: function onclick() {
                    hasBestAnswer = !hasBestAnswer;
                    isBestAnswer = !isBestAnswer;

                    discussion
                        .save({
                            bestAnswerPostId: isBestAnswer ? post.id() : 0,
                            bestAnswerUserId: app.session.user.id(),
                            relationships: isBestAnswer
                                ? { bestAnswerPost: post, bestAnswerUser: app.session.user }
                                : delete discussion.data.relationships.bestAnswerPost,
                        })
                        .then(() => {
                            if (app.current instanceof DiscussionPage) {
                                app.current.stream.update();
                            }

                            m.redraw();

                        });
                    if (isBestAnswer) {
                        m.route(app.route.discussion(discussion));
                    }
                },
            })
        );
    };
};
