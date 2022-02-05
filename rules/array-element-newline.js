// @ts-nocheck

/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
// based on https://github.com/eslint/eslint/blob/master/lib/rules/array-element-newline.js
// - no new line if last array item is an object

/**
 * @fileoverview Rule to enforce line breaks after each array element
 * @author Jan Peer Stöcklmair <https://github.com/JPeer264>
 */

"use strict";

const astUtils = require("./util").astUtils;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "layout",

        docs: {
            description: "enforce line breaks after each array element",
            category: "Stylistic Issues",
            recommended: false
        },

        fixable: "whitespace",

        schema: [
            {
                oneOf: [
                    {
                        enum: ["always", "never", "consistent"]
                    },
                    {
                        type: "object",
                        properties: {
                            multiline: {
                                type: "boolean"
                            },
                            minItems: {
                                type: ["integer", "null"],
                                minimum: 0
                            },
                            allowObjectCurly: {
                                type: "boolean"
                            }
                        },
                        additionalProperties: false
                    }
                ]
            }
        ],

        messages: {
            unexpectedLineBreak: "There should be no linebreak here.",
            missingLineBreak: "There should be a linebreak after this element."
        }
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Normalizes a given option value.
         *
         * @param {string|Object|undefined} providedOption - An option value to parse.
         * @returns {{multiline: boolean, minItems: number}} Normalized option object.
         */
        function normalizeOptionValue(providedOption) {
            let consistent = false;
            let multiline = false;
            let minItems;
            let allowObjectCurly = false;

            const option = providedOption || "always";

            if (option) {
                if (option === "always" || option.minItems === 0) {
                    minItems = 0;
                } else if (option === "never") {
                    minItems = Number.POSITIVE_INFINITY;
                } else if (option === "consistent") {
                    consistent = true;
                    minItems = Number.POSITIVE_INFINITY;
                } else {
                    multiline = Boolean(option.multiline);
                    minItems = option.minItems || Number.POSITIVE_INFINITY;
                }
                allowObjectCurly = Boolean(option.allowObjectCurly);
            } else {
                minItems = 0;
            }

            return { consistent, multiline, minItems, allowObjectCurly };
        }

        /**
         * Normalizes a given option value.
         *
         * @param {string|Object|undefined} options - An option value to parse.
         * @returns {{ArrayExpression: {multiline: boolean, minItems: number}, ArrayPattern: {multiline: boolean, minItems: number}}} Normalized option object.
         */
        function normalizeOptions(options) {
            const value = normalizeOptionValue(options);

            return { ArrayExpression: value, ArrayPattern: value };
        }

        /**
         * Reports that there shouldn't be a line break after the first token
         * @param {Token} token - The token to use for the report.
         * @returns {void}
         */
        function reportNoLineBreak(token) {
            const tokenBefore = sourceCode.getTokenBefore(token, { includeComments: true });

            context.report({
                loc: {
                    start: tokenBefore.loc.end,
                    end: token.loc.start
                },
                messageId: "unexpectedLineBreak",
                fix(fixer) {
                    if (astUtils.isCommentToken(tokenBefore)) {
                        return null;
                    }

                    if (!astUtils.isTokenOnSameLine(tokenBefore, token)) {
                        return fixer.replaceTextRange([tokenBefore.range[1], token.range[0]], " ");
                    }

                    /*
                     * This will check if the comma is on the same line as the next element
                     * Following array:
                     * [
                     *     1
                     *     , 2
                     *     , 3
                     * ]
                     *
                     * will be fixed to:
                     * [
                     *     1, 2, 3
                     * ]
                     */
                    const twoTokensBefore = sourceCode.getTokenBefore(tokenBefore, { includeComments: true });

                    if (astUtils.isCommentToken(twoTokensBefore)) {
                        return null;
                    }

                    return fixer.replaceTextRange([twoTokensBefore.range[1], tokenBefore.range[0]], "");

                }
            });
        }

        /**
         * Reports that there should be a line break after the first token
         * @param {Token} token - The token to use for the report.
         * @returns {void}
         */
        function reportRequiredLineBreak(token) {
            const tokenBefore = sourceCode.getTokenBefore(token, { includeComments: true });

            context.report({
                loc: {
                    start: tokenBefore.loc.end,
                    end: token.loc.start
                },
                messageId: "missingLineBreak",
                fix(fixer) {
                    return fixer.replaceTextRange([tokenBefore.range[1], token.range[0]], "\n");
                }
            });
        }

        /**
         * Reports a given node if it violated this rule.
         *
         * @param {ASTNode} node - A node to check. This is an ObjectExpression node or an ObjectPattern node.
         * @returns {void}
         */
        function check(node) {
            const elements = node.elements;
            const normalizedOptions = normalizeOptions(context.options[0]);
            const options = normalizedOptions[node.type];

            let elementBreak = false;

            /*
             * MULTILINE: true
             * loop through every element and check
             * if at least one element has linebreaks inside
             * this ensures that following is not valid (due to elements are on the same line):
             *
             * [
             *      1,
             *      2,
             *      3
             * ]
             */
            if (options.multiline) {
                elementBreak = elements
                    .filter(element => element !== null)
                    .some(element => element.loc.start.line !== element.loc.end.line);
            }

            const linebreaksCount = node.elements.map((element, i) => {
                const previousElement = elements[i - 1];

                if (i === 0 || element === null || previousElement === null) {
                    return false;
                }

                const commaToken = sourceCode.getFirstTokenBetween(previousElement, element, astUtils.isCommaToken);
                const lastTokenOfPreviousElement = sourceCode.getTokenBefore(commaToken);
                const firstTokenOfCurrentElement = sourceCode.getTokenAfter(commaToken);

                return !astUtils.isTokenOnSameLine(lastTokenOfPreviousElement, firstTokenOfCurrentElement);
            }).filter(isBreak => isBreak === true).length;

            const needsLinebreaksOriginal = (
                elements.length >= options.minItems ||
                (
                    options.multiline &&
                    elementBreak
                ) ||
                (
                    options.consistent &&
                    linebreaksCount > 0 &&
                    linebreaksCount < node.elements.length
                )
            );

            const firstElementType = elements[0] && elements[0].type;
            const lastElementType = elements[elements.length - 1] && elements[elements.length - 1].type;
            const needsLinebreaks = needsLinebreaksOriginal && (
                elements.length === 0 ||
                (
                    // first and last item are not objects
                    elements.length > 0 &&
                    !(
                        ['ObjectExpression', 'ObjectPattern'].includes(firstElementType) ||
                        ['ObjectExpression', 'ObjectPattern'].includes(lastElementType)
                    )
                ) ||
                (
                    // first or last item are objects but allowObjectCurly is turned off
                    elements.length > 0 &&
                    (
                        ['ObjectExpression', 'ObjectPattern'].includes(firstElementType) ||
                        ['ObjectExpression', 'ObjectPattern'].includes(lastElementType)
                    ) &&
                    !options.allowObjectCurly
                )
            );

            elements.forEach((element, i) => {
                const previousElement = elements[i - 1];

                if (i === 0 || element === null || previousElement === null) {
                    return;
                }

                const commaToken = sourceCode.getFirstTokenBetween(previousElement, element, astUtils.isCommaToken);
                const lastTokenOfPreviousElement = sourceCode.getTokenBefore(commaToken);
                const firstTokenOfCurrentElement = sourceCode.getTokenAfter(commaToken);

                if (needsLinebreaks) {
                    if (astUtils.isTokenOnSameLine(lastTokenOfPreviousElement, firstTokenOfCurrentElement)) {
                        reportRequiredLineBreak(firstTokenOfCurrentElement);
                    }
                } else {
                    if (!astUtils.isTokenOnSameLine(lastTokenOfPreviousElement, firstTokenOfCurrentElement)) {
                        reportNoLineBreak(firstTokenOfCurrentElement);
                    }
                }
            });
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            ArrayPattern: check,
            ArrayExpression: check
        };
    }
};
