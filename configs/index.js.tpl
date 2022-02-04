#!/usr/bin/env node

// @ts-check

let _ = require('lodash');
let fs = require('fs');
let outdent = require('outdent');
let path = require('path');

let _configFiles = fs.readdirSync(__dirname).sort();
let _configData = _.reduce(_configFiles, function(acc, configFile) {
  if (path.extname(configFile) !== '.js') {
    return acc;
  }

  if (/\.extends\.js$/.test(configFile)) {
    return acc;
  }

  if (_.includes([
    '.eslintrc.js',
    'index.js',
    'typescript-recommended-restore-eslint.js',
    'util.js'
  ], configFile)) {
    return acc;
  }

  let config = path.basename(configFile, path.extname(configFile));
  configFile = `${path.dirname(configFile)}/${config}`;

  acc[config] = configFile;
  return acc;
}, {});

// @ts-ignore
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
