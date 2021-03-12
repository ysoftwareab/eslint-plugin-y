let eslint = require('eslint');
let rule = require('../rules/no-const');

let _ruleTester = new eslint.RuleTester({
  parser: require.resolve('@babel/eslint-parser'),
  parserOptions: {
    ecmaVersion: 2015,
    requireConfigFile: false,
    sourceType: 'module'
  }
});

_ruleTester.run('no-const', rule, {
  valid: [{
    code: 'var a;'
  }, {
    code: "var b = {a: 'value'}; var {a} = b;"
  }, {
    code: 'let a;'
  }, {
    code: "let b = {a: 'value'}; let {a} = b;"
  }],

  invalid: [{
    code: 'const a = undefined;',
    output: 'let a = undefined;',
    errors: 1
  }, {
    code: "const b = {a: 'value'}; const {a} = b;",
    output: "let b = {a: 'value'}; let {a} = b;",
    errors: 2
  }]
});
