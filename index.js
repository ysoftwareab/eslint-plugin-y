/* eslint-disable lodash/prefer-lodash-method */

let configs = require('./configs');
let rules = require('./rules');

configs = JSON.parse(JSON.stringify(configs));
Object.entries(configs).forEach(function([
  _key,
  value
]) {
  value.extends = value.extends.map(function(path) {
    path = path.replace(/^\.\//, './configs/');
    return path;
  });
});

module.exports = {
  configs,
  rules
};
