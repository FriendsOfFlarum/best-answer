export default class Button {
  static component(attrs: any, ...children: any[]) {
    return { selector: Button, attrs, children } as any;
  }
}
