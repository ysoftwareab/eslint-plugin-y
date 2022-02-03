/* eslint-disable lodash/prefer-lodash-method */

let _ = require('lodash');
let _basic = require('./basic');

let _prefix = '@typescript-eslint/eslint-plugin/dist/configs/';
let _base = require('./util').eslintRequire(`${_prefix}/base`);
let _eslintRecommended = require('./util').eslintRequire(`${_prefix}/eslint-recommended`).overrides[0];
let _recommended = require('./util').eslintRequire(`${_prefix}/recommended`);

// see https://github.com/eslint/eslint/issues/12592
_basic = _.cloneDeep(_basic);

let _restoreBasicOverrides = _.merge(
  {},
  _base,
  _eslintRecommended,
  _recommended
);

let filterObject = function(obj, predicate) {
  // eslint-disable-next-line fp/no-mutating-assign
  return Object.assign(...Object.keys(obj).filter(function(key) {
    return predicate(obj[key], key);
  }).map(function(key) {
    return {
      [key]: obj[key]
    };
  }));
};

let mapObjectValues = function(obj, predicate) {
  // eslint-disable-next-line fp/no-mutating-assign
  return Object.assign(...Object.keys(obj).map(function(key) {
    return {
      [key]: predicate(obj[key], key)
    };
  }));
};

_restoreBasicOverrides.rules = filterObject(_restoreBasicOverrides.rules, function(_value, key) {
  // https://github.com/typescript-eslint/typescript-eslint/blob/13583e65f5973da2a7ae8384493c5e00014db51b/docs/linting/TROUBLESHOOTING.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
  if (key === 'no-undef') {
    return false;
  }
  if (/^@typescript-eslint/.test(key)) {
    return false;
  }
  return true;
});

_restoreBasicOverrides.rules = mapObjectValues(_restoreBasicOverrides.rules, function(_value, key) {
  if (_.isEmpty(_basic.rules[key])) {
    throw new Error(`Expected a ${key} rule in configs/basics. @typescript-eslint:recommended wants to override it.`);
  }
  return _basic.rules[key];
});

module.exports = _restoreBasicOverrides;
