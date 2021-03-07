module.exports = {
  extends: [
    './basic.js',
    './babel.js',
    './async-await.js',
    './eslint-comments.js',
    './firecloud.js',
    './fp.js',
    './import.js',
    './jsdoc.js',
    './lodash.js',
    './no-null.js',
    './proper-arrows.js'
  ],

  globals: {
    __dirname: false,
    __filename: false
  },

  env: {
    browser: true,
    commonjs: true
  }
};
