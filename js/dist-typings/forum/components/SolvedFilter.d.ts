import Component, { ComponentAttrs } from 'flarum/common/Component';
export interface SolvedFilterAttrs extends ComponentAttrs {
    alwaysShow?: boolean;
}
export default class SolvedFilter extends Component<SolvedFilterAttrs> {
    view(): any;
    shouldShowFilter(): boolean;
}
