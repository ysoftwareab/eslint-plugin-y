// NOTE that this is an addon config. An eslint plugin needs to be installed manually.

let _pluginName = 'eslint-plugin-mocha';
let _semver = require('semver');

let _pluginVsn = require('../package.json').optionalPeerDependencies[_pluginName];
let _pluginActualVsn = require('./util').eslintRequire(`${_pluginName}/package.json`).version;

// eslint-disable-next-line lodash/prefer-lodash-method
if (!_semver.satisfies(_pluginActualVsn.replace(/.*#semver:/, ''), _pluginVsn.replace(/.*#semver:/, ''))) {
  throw new Error(`Expected ${_pluginName}@${_pluginVsn} but found version ${_pluginActualVsn} installed.`);
}

module.exports = {
  extends: [
    './mocha.extends'
  ],

  // not set by 'plugin:mocha/recommended'
  env: {
    mocha: true
  },

  settings: {
    'import/core-modules': [
      'chai'
    ]
  },

  rules: {
    'mocha/handle-done-callback': 'error',
    'mocha/max-top-level-suites': ['error', {
      limit: 1
    }],
    'mocha/no-return-from-async': 'error',
    'mocha/no-async-describe': 'error',
    'mocha/no-empty-description': 'error',
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-exports': 'error',
    'mocha/no-global-tests': 'error',
    'mocha/no-hooks': 'off',
    'mocha/no-hooks-for-single-case': 'off',
    'mocha/no-identical-title': 'error',
    'mocha/no-mocha-arrows': 'error',
    'mocha/no-nested-tests': 'error',
    'mocha/no-pending-tests': 'error',
    'mocha/no-return-and-callback': 'error',
    'mocha/no-sibling-hooks': 'error',
    'mocha/no-skipped-tests': 'warn',
    'mocha/no-synchronous-tests': 'off',
    'mocha/no-top-level-hooks': 'error',
    'mocha/prefer-arrow-callback': 'off',
    'mocha/valid-suite-description': 'off',
    'mocha/valid-test-description': 'off'
  }
};
