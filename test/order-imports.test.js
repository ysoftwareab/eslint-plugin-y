/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
// based on https://github.com/eslint/eslint/blob/master/tests/lib/rules/sort-imports.js

/**
 * @fileoverview Tests for order-imports rule.
 * @author Christian Schuller
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../rules/order-imports"),
    { RuleTester } = require("./util");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parser: require.resolve('@babel/eslint-parser'),
    parserOptions: { requireConfigFile: false, ecmaVersion: 6, sourceType: "module" }
}),
    expectedError = {
        message: "Imports should be sorted alphabetically.",
        type: "ImportDeclaration"
    },
    ignoreCaseArgs = [{ ignoreCase: true }];

ruleTester.run("order-imports", rule, {
    valid: [
        "import a from 'foo.js';\n" +
                "import b from 'bar.js';\n" +
                "import c from 'baz.js';\n",
        "import * as B from 'foo.js';\n" +
                "import A from 'bar.js';",
        "import * as B from 'foo.js';\n" +
                "import {a, b} from 'bar.js';",
        "import A from 'foo.js';\n" +
                "import {b, c} from 'bar.js';",
        {
            code:
                "import A from 'bar.js';\n" +
                "import {b, c} from 'foo.js';",
            options: [{
                memberSyntaxSortOrder: ["default", "named", "none", "all"]
            }]
        },
        "import {a, b} from 'bar.js';\n" +
                "import {c, d} from 'foo.js';",
        "import A from 'foo.js';\n" +
                "import B from 'bar.js';",
        "import A from 'foo.js';\n" +
                "import a from 'bar.js';",
        "import a, * as b from 'foo.js';\n" +
                "import c from 'bar.js';",
        "import 'foo.js';\n" +
                " import a from 'bar.js';",
        "import B from 'foo.js';\n" +
                "import a from 'bar.js';",
        {
            code:
                "import a from 'foo.js';\n" +
                "import B from 'bar.js';",
            options: ignoreCaseArgs
        },
        "import {a, b, c, d} from 'foo.js';",
        {
            code:
                "import a from 'foo.js';\n" +
                "import B from 'bar.js';",
            options: [{
                ignoreDeclarationSort: true
            }]
        },
        {
            code: "import {b, A, C, d} from 'foo.js';",
            options: [{
                ignoreMemberSort: true
            }]
        },
        {
            code: "import {B, a, C, d} from 'foo.js';",
            options: [{
                ignoreMemberSort: true
            }]
        },
        {
            code: "import {a, B, c, D} from 'foo.js';",
            options: ignoreCaseArgs
        },
        "import a, * as b from 'foo.js';",
        "import * as a from 'foo.js';\n" +
                "\n" +
                "import b from 'bar.js';",
        "import * as bar from 'bar.js';\n" +
                "import * as foo from 'foo.js';",

        // https://github.com/eslint/eslint/issues/5130
        {
            code:
                "import 'foo';\n" +
                "import bar from 'bar';",
            options: ignoreCaseArgs
        },

        // https://github.com/eslint/eslint/issues/5305
        "import React, {Component} from 'react';"
    ],
    invalid: [
        {
            code:
                "import a from 'foo.js';\n" +
                "import A from 'bar.js';",
            output:
                "import A from 'bar.js';\n" +
                "import a from 'foo.js';",
            errors: [expectedError]
        },
        {
            code:
                "import b from 'foo.js';\n" +
                "import a from 'bar.js';",
            output:
                "import a from 'bar.js';\n" +
                "import b from 'foo.js';",
            errors: [expectedError]
        },
        {
            code:
                "import {b, c} from 'foo.js';\n" +
                "import {a, d} from 'bar.js';",
            output:
                "import {a, d} from 'bar.js';\n" +
                "import {b, c} from 'foo.js';",
            errors: [expectedError]
        },
        {
            code:
                "import * as foo from 'foo.js';\n" +
                "import * as bar from 'bar.js';",
            output:
                "import * as bar from 'bar.js';\n" +
                "import * as foo from 'foo.js';",
            errors: [expectedError]
        },
        {
            code:
                "import {a} from 'foo';\n" +
                "import {b} from 'bar';",
            output:
                "import {b} from 'bar';\n" +
                "import {a} from 'foo';",
            errors: [expectedError]
        },
        {
            code:
                "import {b, c} from 'bar.js';\n" +
                "import a from 'foo.js';",
            output:
                "import a from 'foo.js';\n" +
                "import {b, c} from 'bar.js';",
            errors: [{
                message: "Expected 'default' syntax before 'named' syntax.",
                type: "ImportDeclaration"
            }]
        },
        {
            code:
                "import a from 'foo.js';\n" +
                "import * as b from 'bar.js';",
            output:
                "import * as b from 'bar.js';\n" +
                "import a from 'foo.js';",
            errors: [{
                message: "Expected 'all' syntax before 'default' syntax.",
                type: "ImportDeclaration"
            }]
        },
        {
            code:
                "import a from 'foo.js';\n" +
                "import 'bar.js';",
            output:
                "import 'bar.js';\n" +
                "import a from 'foo.js';",
            errors: [{
                message: "Expected 'none' syntax before 'default' syntax.",
                type: "ImportDeclaration"
            }]
        },
        {
            code:
                "import b from 'bar.js';\n" +
                "import * as a from 'foo.js';",
            output:
                "import * as a from 'foo.js';\n" +
                "import b from 'bar.js';",
            options: [{
                memberSyntaxSortOrder: ["all", "default", "named", "none"]
            }],
            errors: [{
                message: "Expected 'all' syntax before 'default' syntax.",
                type: "ImportDeclaration"
            }]
        },
        {
            code: "import {b, a, d, c} from 'foo.js';",
            output: "import {a, b, c, d} from 'foo.js';",
            errors: [{
                message: "Member 'a' of the import declaration should be sorted alphabetically.",
                type: "ImportSpecifier"
            }]
        },
        {
            code:
                "import {b, a, d, c} from 'foo.js';\n" +
                "import {e, f, g, h} from 'bar.js';",
            output:
                "import {a, b, c, d} from 'foo.js';\n" +
                "import {e, f, g, h} from 'bar.js';",
            options: [{
                ignoreDeclarationSort: true
            }],
            errors: [{
                message: "Member 'a' of the import declaration should be sorted alphabetically.",
                type: "ImportSpecifier"
            }]
        },
        {
            code: "import {a, B, c, D} from 'foo.js';",
            output: "import {B, D, a, c} from 'foo.js';",
            errors: [{
                message: "Member 'B' of the import declaration should be sorted alphabetically.",
                type: "ImportSpecifier"
            }]
        },
        {
            code: "import {zzzzz, /* comment */ aaaaa} from 'foo.js';",
            output: null, // not fixed due to comment
            errors: [{
                message: "Member 'aaaaa' of the import declaration should be sorted alphabetically.",
                type: "ImportSpecifier"
            }]
        },
        {
            code: "import {zzzzz /* comment */, aaaaa} from 'foo.js';",
            output: null, // not fixed due to comment
            errors: [{
                message: "Member 'aaaaa' of the import declaration should be sorted alphabetically.",
                type: "ImportSpecifier"
            }]
        },
        {
            code: "import {/* comment */ zzzzz, aaaaa} from 'foo.js';",
            output: null, // not fixed due to comment
            errors: [{
                message: "Member 'aaaaa' of the import declaration should be sorted alphabetically.",
                type: "ImportSpecifier"
            }]
        },
        {
            code: "import {zzzzz, aaaaa /* comment */} from 'foo.js';",
            output: null, // not fixed due to comment
            errors: [{
                message: "Member 'aaaaa' of the import declaration should be sorted alphabetically.",
                type: "ImportSpecifier"
            }]
        },
        {
            code: `
              import {
                boop,
                foo,
                zoo,
                baz as qux,
                bar,
                beep
              } from 'foo.js';
            `,
            output: `
              import {
                bar,
                beep,
                boop,
                foo,
                baz as qux,
                zoo
              } from 'foo.js';
            `,
            errors: [{
                message: "Member 'qux' of the import declaration should be sorted alphabetically.",
                type: "ImportSpecifier"
            }]
        }
    ]
});
