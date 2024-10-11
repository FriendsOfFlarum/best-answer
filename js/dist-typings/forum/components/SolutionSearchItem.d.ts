import Component, { ComponentAttrs } from 'flarum/common/Component';
import Discussion from 'flarum/common/models/Discussion';
import Post from 'flarum/common/models/Post';
import type Mithril from 'mithril';
import ItemList from 'flarum/common/utils/ItemList';
export interface SolutionSearchItemAttrs extends ComponentAttrs {
    query: string;
    discussion: Discussion;
    bestAnswerPost: Post;
    mostRelevantPost: Post;
    tags: any;
}
export default class SolutionSearchItem extends Component<SolutionSearchItemAttrs> {
    query: string;
    discussion: Discussion;
    bestAnswerPost: Post | null | undefined;
    mostRelevantPost: Post | null | undefined;
    tags: any;
    oninit(vnode: Mithril.Vnode<ComponentAttrs, this>): void;
    view(): JSX.Element;
    discussionTitle(): string;
    bestAnswerContent(): string | null | undefined;
    mostRelevantContent(): string | null | undefined;
    viewItems(): ItemList<Mithril.Children>;
}
