module.exports = {
  extends: [
    './typescript.js',
    // NOTE we assume eslint-plugin-lodash is loaded
    './jsdoc-typescript.js',
    // NOTE we assume eslint-plugin-jsdoc is still loaded
    './lodash-typescript.js'
  ]
};
