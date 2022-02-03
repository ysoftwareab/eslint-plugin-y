#!/usr/bin/env node-esm
// -*- mode: js -*-

import _ from 'lodash';
import fs from 'fs';
import outdent from 'outdent';
import path from 'path';

let _ruleFiles = fs.readdirSync(__dirname).sort();
let _ruleData = _.reduce(_ruleFiles, function(acc, ruleFile) {
  if (path.extname(ruleFile) !== '.js') {
    return acc;
  }

  if (/\.original\.js$/.test(ruleFile)) {
    return acc;
  }

  if (_.includes([
    'index.js',
    'util.js'
  ], ruleFile)) {
    return acc;
  }

  let rule = path.basename(ruleFile, '.js');
  ruleFile = `./${ruleFile}`;

  acc[rule] = ruleFile;
  return acc;
}, {});

let _tpl = _.template(outdent`
  module.exports = {
    <% _.forEach(_ruleData, function(ruleFile, rule) { %>
    '<%= rule %>': require('<%= ruleFile %>'),
    <% }) %>
    '_': undefined
  };
`);

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log(_tpl({_ruleData}));
}

export {
  // eslint-disable-next-line import/prefer-default-export
  _ruleData as ruleData
};
