#!/usr/bin/env node-esm

import _ from 'lodash';
import fs from 'fs';
import outdent from 'outdent';
import path from 'path';

let _configFiles = fs.readdirSync(__dirname).sort();

let _configData = _.reduce(_configFiles, function(acc, configFile) {
  if (path.extname(configFile) !== '.js') {
    return acc;
  }

  if (_.includes([
    '.eslintrc.js',
    'index.js',
    'tpl.index.js',
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

// eslint-disable-next-line no-console
console.log(_tpl({
  _configData
}));
