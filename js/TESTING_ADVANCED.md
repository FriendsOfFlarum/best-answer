# Frontend Unit Testing

Advanced companion to `js/CONTRIBUTING.md`. Focuses on rationale, stubs/test harness, patterns, and typings; operational commands live in `js/CONTRIBUTING.md`.

## Philosophy
- Prefer behavior-first tests: assert observable outcomes, not implementation details.
- Avoid snapshots except when they meaningfully capture public structure.
- Keep tests resilient to internal refactors (don’t reach into private fields or rely on incidental VDOM shapes).

## Stubs and Test Harness
- Flarum, Mithril, and related utilities are stubbed under `js/tests/unit/stubs` and wired via `moduleNameMapper` in `jest.config.cjs`.
- Prefer path aliases in tests to avoid deep relatives:
  - `@src/*` → `js/src/*`
  - `@tests/*` → `js/tests/unit/*`
  - `@helpers/*` → `js/tests/unit/helpers/*`
  - `@stubs/*` → `js/tests/unit/stubs/*`
- Dual ID mapping: both `flarum/*` (runtime module IDs like `flarum/forum/app`) and `@flarum/*` (npm scope like `@flarum/core`) are mapped in TS/Jest to avoid resolution mismatches with vendor d.ts and stubs. Remove one only after standardizing imports and verifying no consumers rely on the other.
- `@src/*` resolution in tests: `tsconfig.test.json` prefers `dist-typings/*` for `@src/*`, falling back to `src/*` when declarations aren’t built. This keeps tests type-checking against stable d.ts when available.
- Common helpers/patterns in tests:
  - `capturedExts` to inspect `extend(...)` hooks.
  - `lastOverrideMap` for override assertions.
  - `createItems()` to build ItemLists for extenders/components.
  - `findByClassName()` for simple VDOM traversal in stubs.
- Stubbing runtime globals narrowly:
  - `app.current.get('stream')`: return only the methods you use (e.g., `{ update() {} }`, `{ goToNumber() {} }`).
  - `m.route.set(...)`: provide `m.route = { set: jest.fn() }` or a no-op to suppress navigation.

Link: see `js/CONTRIBUTING.md` → Stubs and Aliases, ESM/Jest Notes.

### Mithril types vs runtime stubs
- TypeScript resolves `mithril` to real typings from `@types/mithril` for better editor/intellisense and type coverage.
- Jest still maps `mithril` to our stub at runtime (see `jest.config.cjs`).
- We augment Mithril's Vnode type for tests at `js/tests/unit/types/mithril-augment.d.ts` to tolerate stubby vnode shapes (selector, loose attrs/children).

Link: see `js/CONTRIBUTING.md` → ESM/Jest Notes.

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

Link: see `js/CONTRIBUTING.md` → Quick Start → Coverage.

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

Link: see `js/CONTRIBUTING.md` → Quick Start (run/format) for commands.
## Typings
- Declarations pipeline overview (builds optional d.ts for library builds):
  - `yarn build-typings` runs `tsc` and then executes the `post-build-typings` script to normalize import paths in emitted d.ts using sed; there is no Node `.mjs` script in this branch.
Link: see `js/CONTRIBUTING.md` → Advanced → Philosophy: Stubs vs Mocks.
  - Rationale: stabilize IDE/TS consumption for consumers when we ship typings. Unit tests do not depend on built d.ts.
- Tests type-checking (current branch):
  - `js/tsconfig.test.json` maps `@src/*` directly to `src/*` (no `dist-typings` fallback). Tests type-check against source with stubs mapped for Flarum modules.
- Type coverage (tests):
  - We use `typescript-coverage-report`; HTML output is written under `js/coverage-ts/tests/`.
  - Default threshold is 80%. Adjust locally if needed; CI thresholds live in `js/package.json` under `typeCoverage`.
- Editor aid:
  - `js/tests/tsconfig.json` (extends `tsconfig.test.json`) helps editors resolve types in `/tests`.

Link: see `js/CONTRIBUTING.md` → Typings for commands.
