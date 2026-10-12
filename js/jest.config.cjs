const path = require('path');
const config = require('@flarum/jest-config')();

const tagsDir = path.resolve(__dirname, '../vendor/flarum/tags/js');

module.exports = {
  ...config,
  roots: [...config.roots, tagsDir],
  moduleNameMapper: {
    ...config.moduleNameMapper,
    // flarum/tags ships its helpers as plain .js, which Jest loads as CommonJS and cannot parse.
    '^ext:flarum/tags/common/helpers/tagsLabel$': path.resolve(__dirname, 'tests/stubs/tagsLabel.tsx'),
    '^ext:flarum/tags/(.*)$': path.join(tagsDir, 'src', '$1'),
  },
};
