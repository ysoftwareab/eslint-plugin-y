#!/usr/bin/env node-esm
// -*- mode: js -*-

import _ from 'lodash';
import fs from 'fs';
import path from 'path';

import {configData} from './configs/index.js.tpl';
import {ruleData} from './rules/index.js.tpl';

let _configExports = _.mapKeys(configData, function(_value, key) {
  return `configs/${key}`
});

let _ruleExports = _.mapKeys(ruleData, function(_value, key) {
  return `rules/${key}`
});

let _config = {
  'private': true,
  'name': 'eslint-plugin-y',
  'description': 'The ESLint plugin used within Y Software AB.',
  'version': '0.14.0-rc.1',
  'license': 'Unlicense',
  'files': [
    '/*.js',
    '/BUILD',
    '/UNLICENSE',
    '/VERSION',
    '/configs/',
    '/npm-install-peer-dependencies',
    '/rules/'
  ],
  'exports': {
    '.': './index.js',
    ..._configExports,
    ..._ruleExports
  },
  'peerDependencies': {
    '@babel/core': '^7.13.0',
    '@babel/eslint-parser': '^7.13.0',
    '@babel/eslint-plugin': '^7.13.0',
    '@getify/eslint-plugin-proper-arrows': '^11.0.3',
    'eslint': '^8.8.0',
    'eslint-import-resolver-node': '^0.3.3',
    'eslint-plugin-async-await': '^0.0.0',
    'eslint-plugin-eslint-comments': '^3.1.2',
    'eslint-plugin-fp': '^2.3.0',
    'eslint-plugin-import': '^2.18.2',
    'eslint-plugin-jsdoc': '^37.7.0',
    'eslint-plugin-lodash': '^7.1.0',
    'eslint-plugin-no-null': '^1.0.2'
  },
  'optionalPeerDependencies': {
    '@typescript-eslint/eslint-plugin': '^5.10.2',
    'eslint-plugin-jasmine': '^4.1.1',
    'eslint-plugin-jest': '^26.0.0',
    'eslint-plugin-mocha': '^10.0.3',
    'eslint-plugin-protractor': '^2.1.1',
    'eslint-plugin-vue': '^7.5.0',
    'typescript': '^4.1.3'
  },
  'dependencies': {
    'lodash': '^4.17.5',
    'semver': '^7.3.4'
  },
  'devDependencies': {
    '@babel/core': '^7.13.0',
    '@babel/eslint-parser': '^7.13.0',
    '@babel/eslint-plugin': '^7.13.0',
    '@getify/eslint-plugin-proper-arrows': '^11.0.3',
    '@typescript-eslint/eslint-plugin': '^5.10.2',
    '@typescript-eslint/parser': '^5.10.2',
    'eslint': '^8.8.0',
    'eslint-import-resolver-node': '^0.3.3',
    'eslint-plugin-async-await': '^0.0.0',
    'eslint-plugin-eslint-comments': '^3.1.2',
    'eslint-plugin-fp': '^2.3.0',
    'eslint-plugin-import': '^2.18.2',
    'eslint-plugin-jasmine': '^4.1.1',
    'eslint-plugin-jest': '^26.0.0',
    'eslint-plugin-jsdoc': '^37.7.0',
    'eslint-plugin-lodash': '^7.1.0',
    'eslint-plugin-mocha': '^10.0.3',
    'eslint-plugin-no-null': '^1.0.2',
    'eslint-plugin-protractor': '^2.1.1',
    'eslint-plugin-vue': '^7.5.0',
    'eslint-plugin-y': 'file:.',
    'npm-publish-git': 'git://github.com/ysoftwareab/npm-publish-git.git#semver:~0.0.12',
    'outdent': '^0.7.0',
    'typescript': '^4.1.3'
  },
  'scripts': {
    'postinstall': "echo '___ WARN Maybe you want to run node_modules/eslint-plugin-y/npm-install-peer-dependencies.'"
  }
};

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(_config, null, 2));
}
