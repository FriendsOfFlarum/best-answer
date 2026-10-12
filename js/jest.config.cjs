const path = require('path');
const config = require('@flarum/jest-config')();

const tagsDir = path.resolve(__dirname, '../vendor/flarum/tags/js');
const deckDir = path.resolve(__dirname, '../vendor/flarum/deck/js');

module.exports = {
  ...config,
  roots: [...config.roots, tagsDir, deckDir],
  moduleNameMapper: {
    ...config.moduleNameMapper,
    '^ext:flarum/tags/(.*)$': path.join(tagsDir, 'src', '$1'),
    '^ext:flarum/deck/(.*)$': path.join(deckDir, 'src', '$1'),
  },
};
