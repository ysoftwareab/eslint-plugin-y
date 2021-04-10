let _ = require('lodash');
let _nodeConfig = require('./node');
let _browserOnlyConfig = require('./browser-only');

module.exports = _.merge({}, _nodeConfig, _browserOnlyConfig);
