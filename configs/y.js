module.exports = {
  plugins: [
    'y'
  ],

  rules: {
    'array-bracket-newline': 'off',
    'y/array-bracket-newline': ['error', {
      multiline: true,
      minItems: 1,
      allowObjectCurly: true
    }],

    'array-element-newline': 'off',
    'y/array-element-newline': ['error', {
      multiline: true,
      minItems: 1,
      allowObjectCurly: true
    }],

    'y/import-specifier-newline': 'error',
    'y/no-const': 'error',
    'y/no-for': 'error',
    'y/no-underscore-prefix-exported': 'error',

    'object-curly-newline': 'off',
    'y/object-curly-newline': ['error', {
      OnlyParam: {
        multiline: true,
        minProperties: 0, // aka disable
        consistent: true
      },
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

    'object-property-newline': 'off',
    'y/object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: false,
      allowOnlyParamOnSameLine: true
    }],

    'y/order-imports': 'error',
    'y/padding-line-import-multiple': 'error',
    'y/underscore-prefix-non-exported': 'error'
  }
};
