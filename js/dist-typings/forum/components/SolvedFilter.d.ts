import Component, { ComponentAttrs } from 'flarum/common/Component';
import type Tag from 'flarum/tags/common/models/Tag';
export interface SolvedFilterAttrs extends ComponentAttrs {
    currentTag?: Tag;
    alwaysShow?: boolean;
}
export default class SolvedFilter extends Component<SolvedFilterAttrs> {
    view(): any;
    reloadDiscussions(): void;
    shouldShowFilter(): boolean;
}
