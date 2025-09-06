function m(selector?: any, attrs?: any, ...children: any[]) {
  return { selector, attrs, children } as any;
}

(m as any).trust = (v: any) => v;

export default m as any;
