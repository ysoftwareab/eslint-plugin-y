let _ = require('lodash');
let configs = require('./configs');
let rules = require('./rules');

let configsWithFixedPath = _.cloneDeep(configs);
_.forEach(configsWithFixedPath, function(value, _key) {
  if (_.isEmpty(value) || _.isEmpty(value.extends)) {
    return;
  }
  value.extends = _.map(value.extends, function(path) {
    path = _.replace(path, /^\.\//, './configs/');
    return path;
  });
});

module.exports = {
  configs: configsWithFixedPath,
  rules
};
