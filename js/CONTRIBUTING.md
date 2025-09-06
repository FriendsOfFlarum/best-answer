# Testing Guidelines (Frontend)

## Scope
- This document describes testing conventions for the JS/TS code under `js/`.
- Tests live in `js/tests/unit` and run with Jest via `yarn test`.
- Stubs live in `js/tests/unit/stubs` (wired via `moduleNameMapper` in `jest.config.cjs`).

## Philosophy
- Prefer behavior-first tests: assert observable outcomes, not implementation details.
- Avoid snapshots except when they meaningfully capture public structure.
- Keep tests resilient to internal refactors (don’t reach into private fields or rely on incidental VDOM shapes).

## Stubs and Test Harness
- Flarum, Mithril, and related utilities are stubbed under `js/tests/unit/stubs`. Module mappings are configured in `jest.config.cjs`.
- Use path aliases in tests to avoid deep relative paths:
  - `@src/*` points to `js/src/*`
  - `@tests/*` points to `js/tests/unit/*`
  - `@helpers/*` points to `js/tests/unit/helpers/*`
  - `@stubs/*` points to `js/tests/unit/stubs/*`
  - Note: We map both `flarum/*` and `@flarum/*` in tsconfig paths. `flarum/*` is the runtime/browser module ID convention used by Flarum (e.g., `flarum/forum/app`), while `@flarum/*` is the npm package scope (e.g., `@flarum/core`). Keeping both avoids TS/Jest resolution mismatches across source, vendor d.ts, and stubs. Remove one only if you standardize and verify no imports (including vendor typings) rely on the other.
- How `@src/*` resolves during test type-checking:
  - `tsconfig.test.json` prefers `dist-typings/*` for `@src/*`, falling back to `src/*` if declarations are missing.
  - The `check-typings:tests` script builds declarations first (`yarn build-typings`) to ensure IDEs and tsc consume stable d.ts during test checks.
- Common patterns:
  - `capturedExts` (from `flarum/common/extend`) to inspect `extend(...)` hooks.
  - `lastOverrideMap` when asserting override behavior.
  - `createItems()` helper to build Flarum ItemLists for extenders/components.
  - `findByClassName()` helper for walking simple VDOM trees.
- When a module expects runtime globals:
  - `app.current.get('stream')`: return an object containing only the methods you use (e.g., `{ update() {} }`, `{ goToNumber() {} }`).
  - `m.route.set(...)`: stub as `m.route = { set: jest.fn() }` or a no-op to avoid navigation.

### Mithril types vs runtime stubs
- TypeScript resolves `mithril` to real typings from `@types/mithril` for better editor/intellisense and type coverage.
- Jest still maps `mithril` to our stub at runtime (see `jest.config.cjs`).
- We augment Mithril's Vnode type for tests at `js/tests/unit/types/mithril-augment.d.ts` to tolerate stubby vnode shapes (selector, loose attrs/children).

### Why stubs and not only mocks
#### Purpose of `stubs`
- Our files under `js/tests/unit/stubs` are minimal, static replacements that let the code load and run.
- They provide the smallest viable surface (classes, methods, return shapes) without behavior or expectations.
- That’s the textbook definition of a stub.
#### How are stubs used?
- We wire them via Jest’s moduleNameMapper (e.g., '^flarum/(.*)$' → tests/unit/stubs/flarum/$1).
- That’s a compile-time substitution to stabilize imports, not a runtime mock with expectations.
- They exist to make the environment deterministic, not to assert interactions.
#### Where we actually "mock"?
- When we need to observe behaviour, we use `jest.fn` at the call site (e.g., `discussion.save`, `app.current.get('stream').update`, `m.route.set`).
- Those are spies/mocks on specific functions, not the entire module.
- The module-wide test doubles remain stubs.
#### Why it matters?
- Precision
  - **Mocks** implies verification of calls on the double itself (set expectations, assert interactions).
  - We rarely do that with the module replacements; we just let the code run against them.
- Stability
  - Stubs minimize coupling to implementation details — they present a fixed, simple API and keep tests behavior-first.
- ESM constraints
  - With ESM and flarum’s module graph, static stubbing via mapper is simpler and more reliable than heavy jest.mock juggling.

## Coverage
- `jest.config.cjs` collects from:
  - `src/forum/**/*.{ts,tsx,js,jsx}`
  - `src/common/addBestAnswerCountSort.ts`
  - `src/admin/**/*.{ts,tsx,js,jsx}`
- Exclusions: `extend.ts` files and type declarations.
- Do not chase line coverage with implementation-specific assertions. Cover public flows and guard branches instead.

### Type Coverage (tests)
- We track TypeScript coverage of test files using `typescript-coverage-report`.
- Ignores are configured in `js/package.json` under `typeCoverage.ignoreFiles` to exclude stubs, local test-only types, and built declarations.
- Default threshold is 80%. See commands in the Typings section for how to run and where the HTML report is written.

## Patterns We Use
- Components
  - Render methods: assert high-level props or labels; prefer testing handlers by invoking exposed `onclick` functions.
  - Avoid relying on full DOM; operate on the returned VNode shape from stubs when necessary.
- Extenders
  - Install extender once per suite; pull the corresponding entry from `capturedExts` by `method` (e.g., `headerItems`, `requestParams`).
  - Exercise both positive and early-return paths.
- Network/Models
  - Mock `discussion.save`/`model.save` with `jest.fn().mockResolvedValue(...)`.
  - For cleanup code that mutates `data.relationships`, provide a minimal `data: { relationships: {} }` bag on the stub to avoid errors.

## Formatting
- Use Prettier with the Flarum config.
- Format sources: `cd js && yarn format`
- Format tests: `cd js && yarn format:tests`

## Running
- `cd js && yarn install && yarn test`
- With coverage: `cd js && yarn test:coverage`

## Build & Dev (Webpack)
- The package is ESM (`"type": "module"` in `package.json`). The Webpack config at `js/webpack.config.js` is also ESM.
- If you need to adjust the config, use ESM syntax:
  - `import flarumWebpackConfig from 'flarum-webpack-config';`
  - `export default flarumWebpackConfig({ useExtensions: ['fof-user-directory'] });`
- Commands:
  - Build: `cd js && yarn build`
  - Dev watch: `cd js && yarn dev`
- If watch mode errors with EMFILE (too many open files), consider:
  - `CHOKIDAR_USEPOLLING=1 yarn dev` (slower polling), or
  - Increasing OS watcher limits / using `watchman` on macOS.

## Module Formats (.cjs, .mjs, .js)

- Package type: `package.json` sets `"type": "module"` for the `js/` package. That means plain `.js` files are ESM by default.
- When we use `.cjs` (CommonJS):
  - `jest.config.cjs` stays in CJS because Jest’s config loader and `@flarum/jest-config` interop are most reliable with `module.exports`/`require(...)` today.
  - Prefer CJS for tool configs that expect it; it avoids brittle ESM config wiring.
- When we use `.mjs` (ESM):
  - Node-invoked scripts like `scripts/post-build-typings.mjs` are ESM with top‑level await. Using `.mjs` makes this unambiguous and portable even if executed outside this package context.
  - Keep `.mjs` for scripts that need TLA or where ESM semantics must be explicit.
- When we use `.js` (ESM by package type):
  - `webpack.config.js` is authored as ESM (`import`/`export default`) and works under the package ESM mode.
  - Source files remain TypeScript; the note here is about build/test configs and utility scripts.
- Jest + ESM note: tests run via `node --experimental-vm-modules ./node_modules/.bin/jest` to enable ESM interop in Jest’s runtime.

Policy:
- Use CJS (`.cjs`) for Jest config and other tools that expect CommonJS.
- Use ESM with explicit `.mjs` for Node scripts that rely on ESM features (e.g., top‑level await) or where portability/clarity matters.
- Use `.js` as ESM for configs that natively support ESM under our package type (e.g., Webpack 5).
- Be explicit: pick the extension that matches the loader expectations of the tool you’re configuring.

## Typings
- Generate declaration files: `cd js && yarn build-typings`
  - Cleans `dist-typings/`, optionally copies `src/@types` to `dist-typings/@types`, runs `tsc`, then normalizes import paths via a Node script (`scripts/post-build-typings.mjs`).
- Check typings only (src): `cd js && yarn check-typings`
  - Runs TypeScript type-checking for sources under `js/src` without emitting files.
- Check test typings only: `cd js && yarn check-typings:tests`
  - Builds `dist-typings/` first, then runs TypeScript against `tsconfig.test.json` with no emit.
  - `tsconfig.test.json` prefers `dist-typings/*` for `@src/*` path alias, falling back to `src/*`. This isolates tests from runtime stubs while keeping IDEs accurate.
- Test type coverage report: `cd js && yarn check-typings-coverage:tests`
  - Generates a TypeScript coverage report for tests using `tsconfig.test.json`; outputs to `js/coverage-ts/tests/`.
  - Uses the default threshold (80%). Adjust locally with `-t` if you want a non-failing run, e.g. `yarn typescript-coverage-report -p tsconfig.test.json -o coverage-ts/tests -t 0`.
- `js/tests/tsconfig.json` helps some text editors or IDEs to resolve types properly.
