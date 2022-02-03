// NOTE that this is an addon config. An eslint plugin needs to be installed manually.

let _pluginName = '@typescript-eslint/eslint-plugin';
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

let _ = require('lodash');
let _basic = require('./basic');
let _typescriptRestoreBasic = require('./typescript-recommended-restore-basic');

// see https://github.com/eslint/eslint/issues/12592
_basic = _.cloneDeep(_basic);

let isIde = process.env.VSCODE_PID !== undefined;

module.exports = {
  extends: [
    'plugin:@typescript-eslint/eslint-plugin/recommended'
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
    // restore all rules in @typescript-eslint/recommended that are not @typescript-eslint i.e. basic
    ..._typescriptRestoreBasic.rules,

    // -------------------------------------------------------------------------

    // rules in tslint
    // actual tslint rule name follows as a comment, IFF different than @typescript-eslint rule name

    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': ['error', {
      default: 'array'
    }],
    '@typescript-eslint/await-thenable': 'off', // tslint:await-promise
    '@typescript-eslint/ban-ts-comment': 'off', // tslint:ban-ts-ignore
    '@typescript-eslint/ban-types': 'off',

    '@typescript-eslint/no-type-alias': 'off', // tslint:interface-over-type-literal
    '@typescript-eslint/consistent-type-definitions': 'off', // tslint:interface-over-type-literal

    // replaced by @typescript-eslint/naming-convention
    // '@typescript-eslint/class-name-casing': 'error', // tslint:class-name
    '@typescript-eslint/explicit-member-accessibility': 'off', // tslint:member-access
    // replaced by @typescript-eslint/naming-convention
    // '@typescript-eslint/generic-type-naming': 'error',
    // replaced by @typescript-eslint/naming-convention
    // '@typescript-eslint/interface-name-prefix': 'error', // tslint:interface-name
    '@typescript-eslint/member-ordering': ['error'],

    // tslint:no-angle-bracket-type-assertion, tslint: no-object-literal-type-assertion
    '@typescript-eslint/consistent-type-assertions': 'error',

    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // tslint:no-any
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-parameter-properties': 'error',

    // typescript specific but not marked typescriptOnly
    '@typescript-eslint/triple-slash-reference': 'error', // tslint:no-reference-import

    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'off', // tslint:callable-types
    '@typescript-eslint/prefer-namespace-keyword': 'error', // tslint:no-internal-module
    '@typescript-eslint/prefer-readonly': 'off',
    '@typescript-eslint/promise-function-async': 'error', // requiresTypeInfo
    '@typescript-eslint/restrict-plus-operands': 'error', // requiresTypeInfo
    '@typescript-eslint/strict-boolean-expressions': ['error', { // requiresTypeInfo
      allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: true
    }],
    '@typescript-eslint/typedef': 'off',
    '@typescript-eslint/type-annotation-spacing': ['error'], // tslint:typedef-whitespace
    // @typescript-eslint/unbound-method is buggy, otherwise it should be set to 'error'
    '@typescript-eslint/unbound-method': isIde ? 'warn' : 'off', // tslint:no-unbound-method
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

    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'semi',
        requireLast: true
      },
      singleline: {
        delimiter: 'semi',
        requireLast: true
      }
    }],
    // replaced by @typescript-eslint/naming-convention
    // '@typescript-eslint/member-naming': ['error', {
    //   private: '^_'
    // }],
    '@typescript-eslint/no-unnecessary-condition': ['error', {
      allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: true
    }],

    // -------------------------------------------------------------------------

    // rules not in tslint, not specific to the typescript plugin

    'brace-style': 'off',
    '@typescript-eslint/brace-style': _basic.rules['brace-style'],

    // replaced by @typescript-eslint/naming-convention
    // camelcase: 'off',
    // '@typescript-eslint/camelcase': _basic.rules.camelcase,

    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true
    }],

    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': _basic.rules['func-call-spacing'],

    camelcase: 'off',
    '@typescript-eslint/naming-convention': ['warn', {
      // @typescript-eslint/camelcase
      selector: 'default',
      format: ['strictCamelCase'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'forbid'
    }, {
      // camelcase.properties set to never in basic.js
      selector: 'property',
      // eslint-disable-next-line no-null/no-null
      format: null
    }, {
      // '@typescript-eslint/class-name-casing': 'error', // tslint:class-name
      selector: 'class',
      format: ['StrictPascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    }, {
      // '@typescript-eslint/generic-type-naming': 'error',
      // selector: 'typeParameter',
      selector: [
        'typeAlias',
        'typeParameter'
      ],
      format: ['PascalCase'],
      // prefix: 'T'
      custom: {
        // regex: '^T[A-Z][a-zA-Z]+$',
        regex: '^(T[A-Z][a-zA-Z]+|[A-Z])$',
        match: true
      }
    }, {
      // '@typescript-eslint/member-naming': ['error', {private: '^_'}],
      selector: 'memberLike',
      modifiers: ['private'],
      format: ['strictCamelCase'],
      leadingUnderscore: 'require'
    }, {
      // '@typescript-eslint/interface-name-prefix': 'error', // tslint:interface-name
      selector: 'interface',
      format: ['StrictPascalCase'],
      custom: {
        regex: '^I[A-Z]',
        match: false
      }
    }],

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

    '@typescript-eslint/no-misused-promises': ['error', {
      // NOTE this may hide serious problem if NodeJS will terminate the process on unhandled rejections.
      // See https://github.com/typescript-eslint/typescript-eslint/issues/1637
      // See https://github.com/nodejs/node/issues/20392
      checksVoidReturn: false
    }],

    '@typescript-eslint/no-var-requires': 'error',

    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': _basic.rules['no-useless-constructor'],

    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',

    'require-await': 'off',
    '@typescript-eslint/require-await': _basic.rules['require-await'],

    semi: 'off',
    '@typescript-eslint/semi': _basic.rules.semi,

    // -------------------------------------------------------------------------

    // NOTE we assume eslint-plugin-lodash is still loaded

    'lodash/prefer-noop': 'off',
    // bad for typescript, lowers type inference
    'lodash/matches-prop-shorthand': ['error', 'never'],
    'lodash/matches-shorthand': ['error', 'never'],
    'lodash/prefer-matches': 'off',
    'lodash/prop-shorthand': ['error', 'never'],

    // -------------------------------------------------------------------------

    // NOTE we assume eslint-plugin-jsdoc is still loaded

    'jsdoc/no-types': 'error',
    'jsdoc/require-param-description': 'error',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-param': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-returns-type': 'off'
  }
};
