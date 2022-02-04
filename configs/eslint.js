// NOTE: we start with all rules enabled (error) for a strict baseline (eslint:all)
// NOTE: all rules not following "<rule>: error" thus imply preference over the baseline

let isIde = process.env.VSCODE_PID !== undefined;

module.exports = {
  plugins: [],

  extends: [
    './eslint.extends'
  ],

  parser: 'espree',

  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module'
  },

  settings: {},

  env: {
    es6: true
  },

  rules: {
    'accessor-pairs': 'error',
    'array-bracket-newline': ['error', {
      multiline: true,
      minItems: 1
    }],
    'array-bracket-spacing': 'error',
    'array-callback-return': ['error', {
      allowImplicit: true
    }],
    'array-element-newline': ['error', {
      multiline: true,
      minItems: 1
    }],
    'arrow-body-style': 'error',
    'arrow-parens': 'error',
    'arrow-spacing': 'error',
    'block-scoped-var': 'error',
    'block-spacing': 'error',
    'brace-style': 'error',
    'callback-return': 'error',
    camelcase: ['warn', {
      // NOTE commented out because we use the same config for babel/camelcase which doesn't have ignoreImports
      // ignoreImports: true,
      properties: 'never'
    }],
    'capitalized-comments': 'off',
    'class-methods-use-this': 'error',
    'comma-dangle': 'error',
    'comma-spacing': 'error',
    'comma-style': 'error',
    complexity: 'error',
    'computed-property-spacing': 'error',
    'consistent-return': 'off',
    'consistent-this': 'warn',
    'constructor-super': 'error',
    curly: 'error',
    'default-case': 'error',
    'default-case-last': 'error',
    'default-param-last': 'error',
    'dot-location': ['error', 'property'],
    'dot-notation': 'error',
    'eol-last': 'error',
    eqeqeq: ['error', 'allow-null'],
    'for-direction': 'error',
    'func-call-spacing': ['error', 'never'],
    'func-name-matching': 'error',
    'func-names': ['error', 'never'],
    'func-style': ['error', 'expression', {
      allowArrowFunctions: true
    }],
    'function-call-argument-newline': 'off',
    'function-paren-newline': 'off',
    'generator-star-spacing': 'error',
    'getter-return': 'error',
    'global-require': 'error',
    'grouped-accessor-pairs': 'error',
    'guard-for-in': 'off',
    'handle-callback-err': 'error',
    'id-blacklist': 'off',
    'id-length': 'off',
    'id-match': 'off',
    'implicit-arrow-linebreak': 'off',
    'indent-legacy': 'off',
    indent: ['error', 2, {
      VariableDeclarator: {
        var: 2,
        let: 2,
        const: 3
      }
    }],
    'init-declarations': 'off',
    'jsx-quotes': 'error',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'line-comment-position': 'off',
    'linebreak-style': 'error',
    'lines-around-comment': 'error',
    'lines-between-class-members': ['error', 'always'],
    'max-classes-per-file': 'error',
    'max-depth': 'error',
    'max-len': ['error', {
      code: 120,
      ignoreComments: true,
      ignoreUrls: true
    }],
    'max-lines': 'off',
    'max-lines-per-function': ['error', 500],
    'max-nested-callbacks': 'error',
    'max-params': ['warn', 3],
    'max-statements-per-line': 'error',
    'max-statements': 'off',
    'multiline-comment-style': 'off',
    'multiline-ternary': 'off',
    'new-cap': 'error',
    'new-parens': 'error',
    'newline-per-chained-call': 'off',
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'off',
    'no-bitwise': 'error',
    'no-buffer-constructor': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-catch-shadow': 'error',
    'no-class-assign': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-confusing-arrow': 'error',
    'no-console': 'error',
    'no-const-assign': 'error',
    'no-constructor-return': 'error',
    'no-constant-condition': ['error', {
      checkLoops: false
    }],
    'no-continue': 'off',
    'no-control-regex': 'error',
    'no-debugger': isIde ? 'warn' : 'off',
    'no-dupe-else-if': 'error',
    'no-delete-var': 'error',
    'no-div-regex': 'off',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-empty-character-class': 'error',
    'no-empty-function': 'error',
    'no-empty-pattern': 'off',
    'no-empty': ['error', {
      allowEmptyCatch: true
    }],
    'no-eq-null': 'off',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-label': 'error',
    'no-extra-parens': 'off',
    'no-extra-semi': 'error',
    'no-fallthrough': 'error',
    'no-floating-decimal': 'error',
    'no-func-assign': 'error',
    'no-global-assign': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-import-assign': 'error',
    'no-inline-comments': 'off',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-invalid-this': 'warn',
    'no-irregular-whitespace': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-loss-of-precision': 'error',
    'no-magic-numbers': 'off',
    'no-misleading-character-class': 'error',
    'no-mixed-operators': 'off',
    'no-mixed-requires': 'off',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-assign': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-multiple-empty-lines': 'error',
    'no-native-reassign': 'error',
    'no-negated-condition': 'error',
    'no-negated-in-lhs': 'error',
    'no-nested-ternary': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-require': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-new': 'warn',
    'no-nonoctal-decimal-escape': 'error',
    'no-obj-calls': 'error',
    'no-octal-escape': 'error',
    'no-octal': 'error',
    'no-param-reassign': 'off',
    'no-path-concat': 'error',
    'no-plusplus': 'error',
    'no-process-env': 'off',
    'no-process-exit': 'error',
    'no-promise-executor-return': 'error',
    'no-proto': 'error',
    'no-prototype-builtins': 'error',
    'no-redeclare': 'error',
    'no-regex-spaces': 'error',
    'no-restricted-exports': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-imports': 'off',
    'no-restricted-modules': 'off',
    'no-restricted-properties': 'off',
    'no-restricted-syntax': 'off',
    'no-return-assign': 'error',
    'no-return-await': 'off',
    'no-script-url': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-setter-return': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-shadow': 'off',
    'no-spaced-func': 'error',
    'no-sparse-arrays': 'error',
    'no-sync': 'off',
    'no-tabs': 'error',
    'no-template-curly-in-string': 'error',
    'no-ternary': 'off',
    'no-this-before-super': 'warn',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-undef': 'error',
    'no-undefined': 'off',
    'no-underscore-dangle': 'off',
    'no-unexpected-multiline': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': 'error',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-expressions': 'warn',
    'no-unused-labels': 'error',
    'no-unsafe-negation': 'error',
    'no-unsafe-optional-chaining': 'error',
    'no-unused-vars': ['error', {
      args: 'all',
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_',
      ignoreRestSiblings: false,
      vars: 'all',
      varsIgnorePattern: '^_'
    }],
    'no-use-before-define': ['error', {
      classes: false,
      variables: false
    }],
    'no-useless-backreference': 'error',
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'no-warning-comments': ['warn', {
      terms: [
        // fixme is intended for immediate fixes, and should not leak into the master branch
        'fixme'
        // todo is intended for long-term nice-to-have fixes, and thus no warning is needed
        // 'todo'
      ],
      location: 'start'
    }],
    'no-whitespace-before-property': 'error',
    'no-with': 'error',
    'object-curly-newline': ['error', {
      ObjectExpression: {
        multiline: true,
        minProperties: 1,
        consistent: true
      },
      ObjectPattern: {
        multiline: true,
        minProperties: 2, // aka allow 1
        consistent: true
      },
      ImportDeclaration: {
        multiline: true,
        minProperties: 1,
        consistent: true
      },
      ExportDeclaration: {
        multiline: true,
        minProperties: 1,
        consistent: true
      }
    }],
    'object-curly-spacing': 'error',
    'object-property-newline': 'error',
    'object-shorthand': ['error', 'properties'],
    'one-var-declaration-per-line': 'error',
    'one-var': ['error', 'never'],
    'operator-assignment': ['error', 'never'],
    'operator-linebreak': ['error', 'after'],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': ['error', {
      blankLine: 'always',
      prev: 'directive',
      next: '*'
    }, {
      blankLine: 'always',
      prev: '*',
      next: 'export'
    }],
    'prefer-arrow-callback': 'off',
    'prefer-const': 'off',
    'prefer-destructuring': ['error', {
      VariableDeclarator: {
        array: false,
        object: true
      },
      AssignmentExpression: {
        array: false,
        object: false
      }
    }, {
      enforceForRenamedProperties: false
    }],
    'prefer-exponentiation-operator': 'off',
    'prefer-named-capture-group': 'off',
    'prefer-numeric-literals': 'error',
    'prefer-object-spread': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-reflect': 'off',
    'prefer-regex-literals': 'off',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: false
    }],
    radix: 'error',
    'require-atomic-updates': 'off',
    'require-await': 'off',
    'require-jsdoc': 'off',
    'require-unicode-regexp': 'off',
    'require-yield': 'warn',
    'rest-spread-spacing': 'error',
    'semi-spacing': 'error',
    'semi-style': ['error', 'last'],
    semi: 'error',
    'sort-imports': 'off',
    'sort-keys': 'off',
    'sort-vars': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': ['error', 'always'],
    strict: 'error',
    'switch-colon-spacing': ['error', {
      after: true,
      before: false
    }],
    'symbol-description': 'error',
    'template-curly-spacing': ['error', 'never'],
    'template-tag-spacing': ['error', 'never'],
    'unicode-bom': 'error',
    'use-isnan': 'error',
    'valid-jsdoc': 'off',
    'valid-typeof': 'error',
    'vars-on-top': 'error',
    'wrap-iife': ['error', 'inside'],
    'wrap-regex': 'off',
    'yield-star-spacing': 'error',
    yoda: 'error'
  }
};
