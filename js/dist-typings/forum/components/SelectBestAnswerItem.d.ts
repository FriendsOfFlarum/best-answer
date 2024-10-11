import Component, { ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Discussion from 'flarum/common/models/Discussion';
import Mithril from 'mithril';
import Post from 'flarum/common/models/Post';
export interface ISelectBestAnswerItemAttrs extends ComponentAttrs {
    post: Post;
    discussion: Discussion;
}
export default class SelectBestAnswerItem extends Component<ISelectBestAnswerItemAttrs> {
    post: Post;
    discussion: Discussion;
    oninit(vnode: Mithril.Vnode<ISelectBestAnswerItemAttrs, this>): void;
    view(): JSX.Element;
    getSetTime(discussion: Discussion): any;
    items(): ItemList<Mithril.Children>;
}
