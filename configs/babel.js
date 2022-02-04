let _pluginName = '@babel/eslint-plugin';
let _semver = require('semver');

let _pluginVsn = require('../package.json').peerDependencies[_pluginName];
let _pluginActualVsn = require('./util').eslintRequire(`${_pluginName}/package.json`).version;

// eslint-disable-next-line lodash/prefer-lodash-method
if (!_semver.satisfies(_pluginActualVsn.replace(/.*#semver:/, ''), _pluginVsn.replace(/.*#semver:/, ''))) {
  throw new Error(`Expected ${_pluginName}@${_pluginVsn} but found version ${_pluginActualVsn} installed.`);
}

let _ = require('lodash');
let _eslint = require('./eslint');

// see https://github.com/eslint/eslint/issues/12592
// @ts-ignore
_eslint = _.cloneDeep(_eslint);

module.exports = {
  parser: '@babel/eslint-parser',

  parserOptions: {
    requireConfigFile: false,
    sourceType: 'module'
  },

  plugins: [
    '@babel'
  ],

  rules: {
    'new-cap': 'off',
    '@babel/new-cap': _eslint.rules['new-cap'],

    'no-invalid-this': 'off',
    '@babel/no-invalid-this': _eslint.rules['no-invalid-this'],

    'no-unused-expressions': 'off',
    '@babel/no-unused-expressions': _eslint.rules['no-unused-expressions'],

    'object-curly-spacing': 'off',
    '@babel/object-curly-spacing': _eslint.rules['object-curly-spacing'],

    semi: 'off',
    '@babel/semi': _eslint.rules.semi
  }
};
