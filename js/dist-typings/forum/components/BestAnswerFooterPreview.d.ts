import Component, { ComponentAttrs } from 'flarum/common/Component';
import Mithril from 'mithril';
import Post from 'flarum/common/models/Post';
import User from 'flarum/common/models/User';
import ItemList from 'flarum/common/utils/ItemList';
import Discussion from 'flarum/common/models/Discussion';
export interface BestAnswerFooterPreviewAttrs extends ComponentAttrs {
    post: Post;
    user: User;
    discussion: Discussion;
}
export default class BestAnswerFooterPreview extends Component<BestAnswerFooterPreviewAttrs> {
    user: User;
    post: Post;
    discussion: Discussion;
    oninit(vnode: Mithril.Vnode<BestAnswerFooterPreviewAttrs, this>): void;
    view(): JSX.Element;
    postContent(): string | null | undefined;
    /**
     * To maintain compatibility with existing styling, custom themes, etc, each item here must be
     * wrapped in a <li> element.
     *
     * @todo: Remove this requirement for Flarum 2.0
     */
    headerItems(): ItemList<Mithril.Children>;
    userItem(): Mithril.Children;
    metaItem(): Mithril.Children;
}
