#!/usr/bin/env bash
# shellcheck disable=SC2034

PLUGIN=eslint-plugin-${CONFIG}
PLUGIN_RULE_PREFIX=${CONFIG}/
ESLINTRC=eslintrc/${CONFIG}.eslintrc.js
case ${CONFIG} in
    babel)
        PLUGIN=@babel/eslint-plugin
        PLUGIN_RULE_PREFIX=@babel/
        ;;
    eslint)
        PLUGIN=
        PLUGIN_RULE_PREFIX=
        ;;
    jsdoc|jsdoc-*)
        PLUGIN=eslint-plugin-jsdoc
        PLUGIN_RULE_PREFIX=jsdoc/
        ;;
    lodash|lodash-*)
        PLUGIN=eslint-plugin-lodash
        PLUGIN_RULE_PREFIX=lodash/
        ;;
    proper-arrows)
        PLUGIN=@getify/eslint-plugin-proper-arrows
        PLUGIN_RULE_PREFIX=@getify/proper-arrows/
        ;;
    typescript|typescript-*)
        PLUGIN=@typescript-eslint/eslint-plugin
        PLUGIN_RULE_PREFIX=@typescript-eslint/
        ;;
    env-*|recommended|recommended-*)
        PLUGIN=
        PLUGIN_RULE_PREFIX=
        ;;
    *)
        ;;
esac
