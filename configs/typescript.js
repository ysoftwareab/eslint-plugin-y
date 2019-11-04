// NOTE that this is an addon config. An eslint plugin needs to be installed manually.

let _pluginVsn = '^2.6.0';
let _pluginName = '@typescript-eslint/eslint-plugin';
let _pluginActualVsn = require(`${_pluginName}/package.json`).version;
let _semver = require('semver');

if (!_semver.satisfies(_pluginActualVsn, _pluginVsn)) {
  throw new Error(`Expected ${_pluginName}@${_pluginVsn} but found version ${_pluginActualVsn} installed.`);
}

let _ = require('lodash');
let _basic = require('./basic');
let _babel = require('./babel');

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],

  parserOptions: {
    project: './tsconfig.json'
  },

  settings: {
    jsdoc: {
      mode: 'typescript'
    }
  },

  rules: {
    // rules in tslint
    // actual tslint rule name follows as a comment, IFF different than @typescript-eslint rule name

    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': ['error', {
      default: 'array'
    }],
    '@typescript-eslint/await-thenable': 'error', // tslint:await-promise
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-types': 'off',

    '@typescript-eslint/no-type-alias': 'error', // tslint:interface-over-type-literal
    // DEPRECATED // '@typescript-eslint/prefer-interface': 'off', // tslint:interface-over-type-literal
    '@typescript-eslint/consistent-type-definitions': 'off', // tslint:interface-over-type-literal

    '@typescript-eslint/class-name-casing': 'error', // tslint:class-name
    '@typescript-eslint/explicit-member-accessibility': 'off', // tslint:member-access
    '@typescript-eslint/generic-type-naming': 'error',
    '@typescript-eslint/interface-name-prefix': 'error', // tslint:interface-name
    '@typescript-eslint/member-ordering': ['error'],

    // tslint:no-angle-bracket-type-assertion, tslint: no-object-literal-type-assertion
    '@typescript-eslint/consistent-type-assertions': 'error',

    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'off', // tslint:no-any
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-parameter-properties': 'error',

    // typescript specific but not marked typescriptOnly
    // DEPRECATED // '@typescript-eslint/no-triple-slash-reference': 'error', // tslint:no-reference
    '@typescript-eslint/triple-slash-reference': 'error', // tslint:no-reference-import

    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'off', // tslint:callable-types
    '@typescript-eslint/prefer-namespace-keyword': 'error', // tslint:no-internal-module
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/promise-function-async': 'error', // requiresTypeInfo
    '@typescript-eslint/restrict-plus-operands': 'error', // requiresTypeInfo
    '@typescript-eslint/strict-boolean-expressions': 'error', // requiresTypeInfo
    '@typescript-eslint/typedef': 'off',
    '@typescript-eslint/type-annotation-spacing': ['error'], // tslint:typedef-whitespace
    '@typescript-eslint/unbound-method': 'error', // tslint:no-unbound-method
    '@typescript-eslint/no-unnecessary-type-arguments': 'error', // tslint:use-default-type-parameter
    '@typescript-eslint/unified-signatures': 'error',

    // -------------------------------------------------------------------------

    // rules in tslint (overriding eslint rules)

    'consistent-this': 'off',
    '@typescript-eslint/no-this-alias': _basic.rules['consistent-this'], // tslint:no-this-assignment

    // marked as, but not really typescriptOnly
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': _basic.rules['no-use-before-define'], // tslint:no-use-before-declare

    '@typescript-eslint/no-extraneous-class': 'error', // tslint: no-unnecessary-class

    // marked as, but not really typescriptOnly
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': _basic.rules['no-unused-vars'], // tslint:no-unused-variable

    // -------------------------------------------------------------------------

    // rules not in tslint, specific to the typescript plugin

    '@typescript-eslint/member-delimiter-style': 'off', // 'error', // FIXME
    '@typescript-eslint/member-naming': ['error', {
      private: '^_'
    }],
    '@typescript-eslint/no-unnecessary-condition': 'error',

    // -------------------------------------------------------------------------

    // rules not in tslint, not specific to the typescript plugin

    'brace-style': 'off',
    '@typescript-eslint/brace-style': _basic.rules['brace-style'],

    // 'camelcase': 'off',
    'babel/camelcase': 'off',
    '@typescript-eslint/camelcase': _babel.rules.camelcase,

    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true
    }],

    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': _basic.rules['func-call-spacing'],

    'global-require': 'off',
    '@typescript-eslint/no-require-imports': _basic.rules['global-require'],

    indent: 'off',
    // eslint-disable-next-line no-sparse-arrays
    '@typescript-eslint/indent': _.merge([,, {
      // maintain eslint defaults
      SwitchCase: 0,
      flatTernaryExpressions: false
    }], _basic.rules.indent),

    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': _basic.rules['no-array-constructor'],

    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': _basic.rules['no-empty-function'],

    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': _basic.rules['no-extra-parens'],

    'no-magic-numbers': 'off',
    '@typescript-eslint/no-magic-numbers': _basic.rules['no-magic-numbers'],

    '@typescript-eslint/no-misused-promises': 'error',

    '@typescript-eslint/no-var-requires': 'error',

    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': _basic.rules['no-useless-constructor'],

    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',

    'require-await': 'off',
    '@typescript-eslint/require-await': _basic.rules['require-await'],

    // -------------------------------------------------------------------------

    // bad for typescript, lowers type inference
    // NOTE we assume eslint-plugin-lodash is still loaded

    'lodash/prop-shorthand': ['error', 'never'],
    'lodash/prefer-lodash-method': 'off',

    // -------------------------------------------------------------------------

    // NOTE we assume eslint-plugin-jsdoc is still loaded

    'jsdoc/no-types': 'error',
    'jsdoc/require-param-description': 'error',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-param': 'off',
    'jsdoc/require-returns': 'off'
  }
};
