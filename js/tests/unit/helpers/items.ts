// Lightweight ItemList-like helper used in tests to capture added UI items.
export type TestItems = {
  map: Map<string, any>;
  add: (key: string, value: any) => void;
  has: (key: string) => boolean;
  get: (key: string) => any;
  set: (key: string, value: any) => void;
  setContent: (key: string, value: any) => void;
};

export function createItems(): TestItems {
  const map = new Map<string, any>();
  return {
    map,
    add: (key, value) => map.set(key, value),
    has: (key) => map.has(key),
    get: (key) => map.get(key),
    set: (key, value) => map.set(key, value),
    setContent: (key, value) => map.set(key, value),
  };
}
