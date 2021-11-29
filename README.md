# eslint-plugin-y [![Build Status][2]][1]

The ESLint plugin used within y.

In your project's `.eslintrc.js`

```js
module.exports = {
  extends: [
    'plugin:y/node'
  ],
  rules: {
    'override-some-rule': error
  }
}
```

Optionally, you can run `node_modules/eslint-plugin-y/npm-install-peer-dependencies`
in order to install the required peer dependencies.

If you want to use an addon, it's as easy as doing this in `.eslintrc.js`:

```js
module.exports = {
  extends: [
    'plugin:y/node',
    'plugin:y/jest'
  ],
  rules: {
    'override-some-rule': error
  }
}
```

and running `npm install --dev eslint-plugin-jest`.


## Bundles

Common bundles are provided as following:

- Node.js: `plugin:y/node`
- Browser: `plugin:y/browser`

These addons require you to install the plugin manually:

- `@typescript-eslint/eslint-plugin`: `plugin:y/typescript`
- `eslint-plugin-jasmine`: `plugin:y/jasmine`
- `eslint-plugin-jest`: `plugin:y/jest`
- `eslint-plugin-mocha` (with Chai): `plugin:y/mocha`
- `eslint-plugin-protractor`: `plugin:y/protractor`
- `eslint-plugin-vue`: `plugin:y/vue`


## Guiding Principles

"I (don't) like/want ..." is no argument in this codebase.
Instead, we follow a few guiding principles
that have concrete consequences on daily work.

### 1. Keep It Short
  * lines
  * functions
  * modules
### 2. Reduce Merge Conflicts
  * do less on the same line
  * break array/object expressions/patterns
  * break import specifiers
  * break conditions
### 3. Reduce Cognitive Load (via explicit code)
  * even if code becomes more verbose
### 4. Reduce Dependency (on specific ecma versions)
  * use a transpiler like babel (for syntax)
  * use a utility library like lodash-y (for functionality)
### 5. Increase Consistency
  * don't use arrow functions when you don't need them
  * don't use template literals when you don't need them


## References to conventions that cannot/will not be put into eslint rules

* https://www.robinwieruch.de/javascript-naming-conventions
* Not strictly related to eslint/style, but when writing TypeScript, see [our guideline](typescript.md).


## Backwards compatibility

In March 2021, repositories got renamed

* `eslint-config-y` -> `eslint-plugin-y` (this one)
* `eslint-plugin-y` -> `eslint-plugin-y-deprecated` ([this one](https://github.com/ysoftwareab/eslint-plugin-y-deprecated))

The reason for this change was because ESlint can now store and reference configs inside a plugin,
and because npm@7 has a backward incompatible change to auto-install peer dependencies,
while the previous setup only works on the assumption that peer dependencies are not automatically installed.

Github's behaviour is to redirect when renaming, so currently both `ysoftwareab/eslint-config-y`
and `ysoftwareab/eslint-plugin-y` are pointing to the same content of this repository.

So for backwards compatibility,
the v0.0.x and v0.1.x tags are from the original `eslint-plugin-y`,
now called `eslint-plugin-y-deprecated`,
while the v0.0.x and v0.1.x tags of the original `eslint-config-y`
have been namespaced with `config/`.


## License

[UNLICENSE](UNLICENSE)


  [1]: https://github.com/ysoftwareab/eslint-plugin-y/actions?query=workflow%3ACI+branch%3Amaster
  [2]: https://github.com/ysoftwareab/eslint-plugin-y/workflows/CI/badge.svg?branch=master
