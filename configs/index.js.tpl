#!/usr/bin/env node
// -*- mode: js -*-

let _ = require('lodash');
let fs = require('fs');
let outdent = require('outdent');
let path = require('path');

let _configFiles = fs.readdirSync(__dirname).sort();
let _configData = _.reduce(_configFiles, function(acc, configFile) {
  if (path.extname(configFile) !== '.js') {
    return acc;
  }

  if (/\.eslintrc\.js$/.test(configFile)) {
    return acc;
  }

  if (_.includes([
    '.eslintrc.js',
    'index.js',
    'util.js'
  ], configFile)) {
    return acc;
  }

  let config = path.basename(configFile, '.js');
  configFile = `./${configFile}`;

  acc[config] = configFile;
  return acc;
}, {});

let _tpl = _.template(outdent`
  module.exports = {
    <% _.forEach(_configData, function(configFile, config) { %>
    '<%= config %>': {
      extends: [
        '<%= configFile %>'
      ]
    },
    <% }) %>
    '_': undefined
  };
`);

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log(_tpl({_configData}));
}

module.exports = {
  // eslint-disable-next-line import/prefer-default-export
  configData: _configData
};
