let _ = require('lodash');

// workaround for package.json exports and ERR_PACKAGE_PATH_NOT_EXPORTED
// see https://github.com/nodejs/node/issues/33460#issuecomment-919184789
let saneRequire = function(request, options = undefined) {
  let requestParts = _.split(request, '/');
  if (_.startsWith(request, '.') || _.startsWith(request, '/')) {
    return require(request, options);
  }

  try {
    return require(request, options);
  } catch (err) {
    // MODULE_NOT_FOUND for v13.1-v13.9
    // ERR_PACKAGE_PATH_NOT_EXPORTED for newer
    if (err.code !== 'MODULE_NOT_FOUND' && err.code !== 'ERR_PACKAGE_PATH_NOT_EXPORTED') {
      throw err;
    }
  }

  let moduleName = requestParts[0];
  requestParts.shift();
  if (_.startsWith(moduleName, '@')) {
    moduleName = `${moduleName}/${requestParts[0]}`;
    requestParts.shift();
  }
  let deepRequest = _.join(requestParts, '/');
  let moduleMainFilePath = require.resolve(moduleName, options);
  let searchForPathSection = `node_modules/${moduleName}`;
  let lastIndex = moduleMainFilePath.lastIndexOf(searchForPathSection);
  if (lastIndex === -1) {
    throw new Error(`Couldn't resolve the base path of "${moduleName}". \
Searched inside the resolved main file path "${moduleMainFilePath}" using "${searchForPathSection}"`);
  }

  let moduleBasePath = moduleMainFilePath.slice(0, lastIndex + searchForPathSection.length);
  return require(`${moduleBasePath}/${deepRequest}`, options);
};

let _eslintResolve = saneRequire('eslint/lib/shared/relative-module-resolver').resolve;
// let _eslintResolve = require('eslint/lib/shared/relative-module-resolver').resolve;
// let _eslintResolve = require('@eslint/eslintrc/lib/shared/relative-module-resolver').resolve;

let eslintRequire = function(moduleName) {
  // same procedure as in eslint/lib/init/config-initializer.js and eslint/lib/cli-engine/cli-engine.js
  let absolutePath = _eslintResolve(moduleName, `${process.cwd()}/__placeholder__.js`);
  let module = require(absolutePath);
  return module;
};

module.exports = {
  eslintRequire,
  saneRequire
};
