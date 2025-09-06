export type CapturedExt = { proto: any; method: string; fn: Function };
export const capturedExts: CapturedExt[] = [];

export let lastOverrideMap: any = null;

export function extend(proto: any, method: string, fn: Function) {
  capturedExts.push({ proto, method, fn });
}

export function override(_proto: any, _method: string, mutator: (map: () => Record<string, string>) => any) {
  const base = () => ({ base: 'ok' });
  lastOverrideMap = mutator(base);
}
