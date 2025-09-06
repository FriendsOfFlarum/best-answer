export interface ComponentAttrs {}
export default class Component<A = ComponentAttrs> {
  attrs!: A;
  oninit(vnode: { attrs: A }) {
    this.attrs = vnode.attrs;
  }
  view() {
    return null as any;
  }
}
