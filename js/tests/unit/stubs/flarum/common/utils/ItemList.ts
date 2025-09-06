export default class ItemList<T = any> {
  private store = new Map<string, { content: T; priority: number }>();

  add(key: string, content: T, priority = 0) {
    this.store.set(key, { content, priority });
  }

  has(key: string) {
    return this.store.has(key);
  }

  get(key: string): any {
    return this.store.get(key)?.content;
  }

  setContent(key: string, content: T) {
    const entry = this.store.get(key) || { content, priority: 0 };
    entry.content = content;
    this.store.set(key, entry);
  }

  toArray(): any[] {
    return [...this.store.entries()]
      .sort((a, b) => (b[1]?.priority ?? 0) - (a[1]?.priority ?? 0))
      .map(([, v]) => (v && typeof v === 'object' && 'content' in v ? (v as any).content : v))
      .filter((v) => v !== undefined);
  }
}
