// NOTE that this is an addon config. An eslint plugin needs to be installed manually.

let _pluginName = 'eslint-plugin-jest';
let _typescriptName = 'typescript';
let _semver = require('semver');

let _pluginVsn = require('../package.json').optionalPeerDependencies[_pluginName];
let _typescriptVsn = require('../package.json').optionalPeerDependencies[_typescriptName];

let _pluginActualVsn = require('./util').eslintRequire(`${_pluginName}/package.json`).version;
// eslint-disable-next-line lodash/prefer-lodash-method
if (!_semver.satisfies(_pluginActualVsn.replace(/.*#semver:/, ''), _pluginVsn.replace(/.*#semver:/, ''))) {
  throw new Error(`Expected ${_pluginName}@${_pluginVsn} but found version ${_pluginActualVsn} installed.`);
}

let _typescriptActualVsn = require('./util').eslintRequire(`${_typescriptName}/package.json`).version;
// eslint-disable-next-line lodash/prefer-lodash-method
if (!_semver.satisfies(_typescriptActualVsn.replace(/.*#semver:/, ''), _typescriptVsn.replace(/.*#semver:/, ''))) {
  throw new Error(`Expected ${_typescriptName}@${_typescriptVsn} but found version ${_typescriptActualVsn} installed.`);
}

module.exports = {
  extends: [
    'plugin:jest/recommended'
  ],

  rules: {
    'jest/consistent-test-it': ['error', {
      fn: 'it'
    }],
    'jest/expect-expect': 'error',
    'jest/no-alias-methods': 'error',
    'jest/no-conditional-expect': 'off',
    'jest/no-commented-out-tests': 'error',
    'jest/no-deprecated-functions': 'error',
    'jest/no-done-callback': 'error',
    'jest/no-duplicate-hooks': 'error',
    'jest/no-empty-title': 'error',
    'jest/no-export': 'error',
    'jest/no-hooks': 'off',
    'jest/no-if': 'error',
    'jest/no-interpolation-in-snapshots': 'error',
    'jest/no-jasmine-globals': 'error',
    'jest/no-large-snapshots': 'error',
    'jest/no-mocks-import': 'error',
    'jest/no-restricted-matchers': 'off',
    'jest/no-standalone-expect': 'error',
    'jest/no-test-return-statement': 'error',
    'jest/prefer-called-with': 'off',
    'jest/prefer-comparison-matcher': 'error',
    'jest/prefer-equality-matcher': 'error',
    'jest/prefer-expect-assertions': 'off',
    'jest/prefer-expect-resolves': 'error',
    'jest/prefer-lowercase-title': 'error',
    'jest/prefer-spy-on': 'error',
    'jest/prefer-strict-equal': 'error',
    'jest/prefer-to-contain': 'error',
    'jest/prefer-to-have-length': 'error',
    'jest/require-hook': 'error',
    'jest/require-top-level-describe': 'error',
    'jest/require-to-throw-message': 'off'
  }
};
