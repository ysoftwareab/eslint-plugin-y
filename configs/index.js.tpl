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
  // TODO remove below fix for node 12&14, which leave trailing spaces on empty lines
  // console.log(_tpl({_configData}));
  // eslint-disable-next-line no-console
  console.log(_.replace(_tpl({_configData}), /\n\s+\n/g, '\n\n'));
}

module.exports = {
  // eslint-disable-next-line import/prefer-default-export
  configData: _configData
};
