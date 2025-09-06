// Test-only augmentation to make Mithril Vnode types compatible with our stubs and test expectations.
declare namespace Mithril {
  interface Vnode<A = any, S = any> {
    // Present on our stubbed vnodes returned in tests
    selector?: any;
    // Loosen attrs/children to avoid friction in tests
    attrs: any;
    children?: any;
  }
}
