// Ambient shims used exclusively for TypeScript type-checking of tests.
// They keep tsc from type-checking production sources while allowing imports to resolve.

declare module '@src/*' {
  const mod: any;
  export = mod;
}

// Some suites reference global explicitly; provide a loose typing.
declare var global: any;

// Jest ESM helpers can be imported as '@jest/globals'. Provide minimal typings.
declare module '@jest/globals' {
  export const jest: any;
  export const describe: any;
  export const it: any;
  export const test: any;
  export const expect: any;
  export const beforeEach: any;
  export const afterEach: any;
  export const beforeAll: any;
  export const afterAll: any;
}

