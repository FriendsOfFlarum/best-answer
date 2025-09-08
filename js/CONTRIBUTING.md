# Frontend Testing

## Quick Start
- Install and test:
  - `cd js && yarn install`
  - `yarn test`
- Coverage: `yarn test:coverage`
- Format:
  - Sources: `yarn format`
  - Tests: `yarn format:tests`
- Type checks:
  - Sources: `yarn check-typings`
  - Tests (optional): `yarn tsc -p tsconfig.test.json --noEmit`

## Layout
- Source: `js/src/*` (TypeScript)
- Tests: `js/tests/unit/*`
- Stubs: `js/tests/unit/stubs/*` (Flarum/Mithril/jquery minimal shims)

## Stubs and Aliases
- Jest maps Flarum/Mithril/jquery to local stubs via `js/jest.config.cjs`.
- Preferred aliases in tests:
  - `@src/*` → `js/src/*`
  - `@tests/*` → `js/tests/unit/*`
  - `@helpers/*` → `js/tests/unit/helpers/*`
  - `@stubs/*` → `js/tests/unit/stubs/*`
- TypeScript test config: `js/tsconfig.test.json` aligns with these aliases.

## ESM/Jest Notes
- Package type is ESM; Jest runs with Node’s ESM interop flag via the test script.
- Jest config is CommonJS (`jest.config.cjs`) for compatibility with Jest’s loader and `@flarum/jest-config`.

## Build & Dev
- Build bundle: `yarn build`
- Dev (watch): `yarn dev`

---

## Advanced

### Philosophy: Stubs vs Mocks
- Stubs under `tests/unit/stubs` provide minimal, stable module surfaces.
- Use `jest.fn()` at call sites to observe behavior (e.g., `discussion.save`, `m.route.set`).
- This keeps tests behavior-first and resilient to refactors.

### Module Formats Policy
- Use `.cjs` for Jest config and tools expecting CommonJS.
- Use `.mjs` for Node scripts requiring ESM features.
- Use `.js` (ESM by package type) where the tool natively supports it (e.g., Webpack 5).

### Typings
- Source typing check: `yarn check-typings`.
- Test typing check (optional): `yarn tsc -p tsconfig.test.json --noEmit`.
- Declarations pipeline (for library builds):
  - Clean: `yarn clean-typings`
  - Build: `yarn build-typings`
  - Post-process: `yarn post-build-typings`
- Note: Tests do not require building `dist-typings/`; they type-check directly against `src`.
