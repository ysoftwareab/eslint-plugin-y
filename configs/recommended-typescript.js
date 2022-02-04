module.exports = {
  extends: [
    './typescript',
    // NOTE we assume eslint-plugin-lodash is loaded
    './jsdoc-typescript',
    // NOTE we assume eslint-plugin-jsdoc is still loaded
    './lodash-typescript'
  ]
};
