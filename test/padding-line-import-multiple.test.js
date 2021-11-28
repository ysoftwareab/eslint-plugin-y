/* eslint-disable y/underscore-prefix-non-exported */
let eslint = require('eslint');
let rule = require('../rules/padding-line-import-multiple');

let _ruleTester = new eslint.RuleTester({
  parser: require.resolve('@babel/eslint-parser'),
  parserOptions: {
    ecmaVersion: 2015,
    requireConfigFile: false,
    sourceType: 'module'
  }
});
let _errorMessage = 'Expected an empty line before multiline import statement.';

_ruleTester.run('padding-line-import-multiple', rule, {
  valid: [{
    code: 'import a from "b"'
  }, {
    code: [
      'import f from "d"',
      'import c from "a"'
    ].join('\n')
  }, {
    code: [
      'import {',
      'a',
      '} from "b"'
    ].join('\n')
  }, {
    code: [
      'import a from "b"',
      '',
      'import {c} from "b"'
    ].join('\n')
  }, {
    code: [
      'import {',
      'a',
      '} from "b"',
      '',
      'import {c} from "b"'
    ].join('\n')
  }, {
    code: [
      'import {a} from "b";',
      'import {c} from "b"'
    ].join('\n')
  }],

  invalid: [{
    code: [
      'import a from "b";',
      'import {b,',
      'c} from "b"'
    ].join('\n'),
    errors: [{
      message: _errorMessage
    }],
    output: [
      'import a from "b";',
      '',
      'import {b,',
      'c} from "b"'
    ].join('\n')
  }, {
    // don't fix if comment present
    code: [
      'import a from "b";',
      '//comment',
      'import {b,',
      'c} from "b"'
    ].join('\n'),
    errors: [{
      message: _errorMessage
    }],
    output: [
      'import a from "b";',
      '//comment',
      'import {b,',
      'c} from "b"'
    ].join('\n')
  }]
});
