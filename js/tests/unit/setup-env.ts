// Minimal test environment boot, avoiding @flarum/jest-config's core dependency.
import m from 'mithril';

// Expose mithril to code paths that look up global m
(globalThis as unknown as { m: typeof m }).m = m;
(m as unknown as { redraw: () => void }).redraw = () => {};

type JQueryLike = (...args: unknown[]) => Record<string, never>;
(globalThis as unknown as { $: JQueryLike }).$ = function (): Record<string, never> {
  return {} as const;
};

// Provide a minimal window object fields some utilities expect.
if (!(globalThis as any).window) {
  (globalThis as unknown as { window: Window & typeof globalThis }).window = globalThis as any;
}

// Provide a minimal CommonJS-like require for modules that call require() at runtime
// (e.g., optional peer integrations in extension code).
// Note: we avoid overriding Node's require to prevent interference with Jest.
