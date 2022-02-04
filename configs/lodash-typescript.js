module.exports = {
  rules: {
    'lodash/prefer-noop': 'off',
    // bad for typescript, lowers type inference
    'lodash/matches-prop-shorthand': ['error', 'never'],
    'lodash/matches-shorthand': ['error', 'never'],
    'lodash/prefer-matches': 'off',
    'lodash/prop-shorthand': ['error', 'never']
  }
};
