// note that this is an addon
// please update README.md with required version of the eslint plugin
// when introducing breaking changes

module.exports = {
  extends: [
    'plugin:jasmine/recommended'
  ],

  env: {
    jasmine: true
  },

  plugins: [
    'jasmine'
  ],

  rules: {
    'class-methods-use-this': 'off',
    // 'jasmine/no-disabled-tests': 'warn',
    // 'jasmine/no-focused-tests': 'warn',
    // 'jasmine/valid-expect': 'off',
    'max-classes-per-file': 'off'
  }
};
