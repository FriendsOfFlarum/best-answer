const path = require('path');
const config = require('@flarum/jest-config')();

const tagsDir = path.resolve(__dirname, '../vendor/flarum/tags/js');

module.exports = {
  ...config,
  roots: [...config.roots, tagsDir],
  moduleNameMapper: {
    ...config.moduleNameMapper,
    '^ext:flarum/tags/(.*)$': path.join(tagsDir, 'src', '$1'),
  },
};
