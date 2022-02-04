module.exports = {
  root: true,

  extends: [
    './configs/recommended-node.js'
  ],

  rules: {
    // no import syntax via babel in this repo
    'global-require': 'off'
  }
};
