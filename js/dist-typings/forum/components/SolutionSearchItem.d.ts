import Component, { ComponentAttrs } from 'flarum/common/Component';
import type Discussion from 'flarum/common/models/Discussion';
import type Post from 'flarum/common/models/Post';
import type Mithril from 'mithril';
import ItemList from 'flarum/common/utils/ItemList';
import type Tag from 'flarum/tags/common/models/Tag';
export interface SolutionSearchItemAttrs extends ComponentAttrs {
    query: string;
    discussion: Discussion;
    bestAnswerPost: Post;
    mostRelevantPost: Post;
    tags: false | (Tag | undefined)[];
}
export default class SolutionSearchItem extends Component<SolutionSearchItemAttrs> {
    query: string;
    discussion: Discussion;
    bestAnswerPost: Post | null | undefined;
    mostRelevantPost: Post | null | undefined;
    tags: false | (Tag | undefined)[];
    oninit(vnode: Mithril.Vnode<ComponentAttrs, this>): void;
    view(): JSX.Element;
    discussionTitle(): string;
    bestAnswerContent(): string | null | undefined;
    mostRelevantContent(): string | null | undefined;
    viewItems(): ItemList<Mithril.Children>;
}
