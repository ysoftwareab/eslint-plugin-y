let _eslintResolve = require('eslint/lib/shared/relative-module-resolver').resolve;
// let _eslintResolve = require('@eslint/eslintrc/lib/shared/relative-module-resolver').resolve;

let eslintRequire = function(moduleName) {
  // same procedure as in eslint/lib/init/config-initializer.js and eslint/lib/cli-engine/cli-engine.js
  let absolutePath = _eslintResolve(moduleName, `${process.cwd()}/__placeholder__.js`);
  let module = require(absolutePath);
  return module;
};

module.exports = {
  eslintRequire
};
