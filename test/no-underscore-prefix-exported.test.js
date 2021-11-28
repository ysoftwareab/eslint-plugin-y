/* eslint-disable y/underscore-prefix-non-exported */
let eslint = require('eslint');
let rule = require('../rules/no-underscore-prefix-exported');

let _ruleTester = new eslint.RuleTester({
  parser: require.resolve('@babel/eslint-parser'),
  parserOptions: {
    ecmaVersion: 2015,
    requireConfigFile: false,
    sourceType: 'module'
  }
});

_ruleTester.run('no-underscore-prefix-exported', rule, {
  valid: [{
    code: 'export let a = 4;'
  }, {
    code: 'export let {b} = a;'
  }, {
    code: 'export function f(b, c){let a = 3}'
  }, {
    code: 'export var {[yo]: weird} = a;'
  }, {
    code: 'let _a = 5;'
  }, {
    code: 'let {b} = a'
  }, {
    code: 'var {b: d} = a'
  }, {
    code: 'function _f(b, c){let a = 3}'
  }],

  invalid: [{
    code: 'export let _a = 5',
    errors: 1
  }, {
    code: 'export let {_a} = 5',
    errors: 1
  }, {
    code: 'export let {a:_b} = 5',
    errors: 1
  }, {
    code: 'export function _a(b, c){let d = 5}',
    errors: 1
  }, {
    code: 'export let {[b]:_c} = {}',
    errors: 1
  }]
});
