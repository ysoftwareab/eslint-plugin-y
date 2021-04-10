let _ = require('lodash');
let _nodeOnlyConfig = require('./node-only');

let _nodeConfig = {
  extends: [
    './basic.js',
    './babel.js',
    './async-await.js',
    './eslint-comments.js',
    './firecloud.js',
    './fp.js',
    './import.js',
    './jsdoc.js',
    './lodash.js',
    './no-null.js',
    './proper-arrows.js'
  ]
};

module.exports = _.merge(_nodeConfig, _nodeOnlyConfig);
