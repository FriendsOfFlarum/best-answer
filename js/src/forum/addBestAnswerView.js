import { extend } from 'flarum/extend';
import CommentPost from 'flarum/components/CommentPost';
import PostComponent from 'flarum/components/Post';
import icon from 'flarum/helpers/icon';
import PostMeta from 'flarum/components/PostMeta';
import username from 'flarum/helpers/username';
import userOnline from 'flarum/helpers/userOnline';

import SelectBestAnswerItem from './components/SelectBestAnswerItem';

export default () => {
    extend(CommentPost.prototype, 'headerItems', function(items) {
        const post = this.props.post;

        if (
            post.discussion().bestAnswerPost() &&
            post
                .discussion()
                .bestAnswerPost()
                .id() === post.id() &&
            !post.isHidden()
        ) {
            items.add(
                'isBestAnswer',
                SelectBestAnswerItem.component({
                    post,
                    discussion: post.discussion(),
                })
            );
        }
    });

    extend(CommentPost.prototype, 'footerItems', function(items) {
        const thisPost = this.props.post;
        const discussion = thisPost.discussion();
        const post = discussion.bestAnswerPost();

        if (post && !post.isHidden() && thisPost.number() === 1 && !thisPost.isHidden()) {
            const user = post.user();

            items.add(
                'bestAnswerPost',
                <div className="CommentPost">
                    <div className="Post-header">
                        <ul>
                            <li className="item-user">
                                <div className="PostUser">
                                    {userOnline(user)}
                                    <h3>
                                        <a href={app.route.user(user)} config={m.route}>
                                            {username(user)}
                                        </a>
                                    </h3>
                                </div>
                            </li>
                            <li className="item-meta">{PostMeta.component({ post })}</li>
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
        }
    });

    extend(PostComponent.prototype, 'attrs', function(attrs) {
        const post = this.props.post;

        if (
            post.discussion().bestAnswerPost() &&
            post
                .discussion()
                .bestAnswerPost()
                .id() === post.id() &&
            !post.isHidden()
        ) {
            attrs.className += ' Post--bestAnswer';
        }
    });
};
