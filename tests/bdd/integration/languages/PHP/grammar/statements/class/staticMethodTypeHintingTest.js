/*
 * Uniter - JavaScript PHP interpreter
 * Copyright 2013 Dan Phillimore (asmblah)
 * http://asmblah.github.com/uniter/
 *
 * Released under the MIT license
 * https://github.com/asmblah/uniter/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    '../../../tools',
    'js/util'
], function (
    tools,
    util
) {
    'use strict';

    describe('PHP Parser grammar class definition statement static method type hinting integration', function () {
        var parser;

        beforeEach(function () {
            parser = tools.createParser();
        });

        util.each({
            'empty method definition with one "array" type hinted arg but no statements': {
                code: util.heredoc(function () {/*<<<EOS
<?php
    class Thing {
        public static function doNothing(array $items) {}
    }
EOS
*/;}), // jshint ignore:line
                expectedAST: {
                    name: 'N_PROGRAM',
                    statements: [{
                        name: 'N_CLASS_STATEMENT',
                        className: 'Thing',
                        members: [{
                            name: 'N_STATIC_METHOD_DEFINITION',
                            method: 'doNothing',
                            visibility: 'public',
                            args: [{
                                name: 'N_ARGUMENT',
                                type: 'array',
                                variable: {
                                    name: 'N_VARIABLE',
                                    variable: 'items'
                                }
                            }],
                            body: {
                                name: 'N_COMPOUND_STATEMENT',
                                statements: []
                            }
                        }]
                    }]
                }
            },
            'empty method definition with one unnamespaced class type hinted arg but no statements': {
                code: util.heredoc(function () {/*<<<EOS
<?php
    class Thing {
        public static function doNothing(ItemList $items) {}
    }
EOS
*/;}), // jshint ignore:line
                expectedAST: {
                    name: 'N_PROGRAM',
                    statements: [{
                        name: 'N_CLASS_STATEMENT',
                        className: 'Thing',
                        members: [{
                            name: 'N_STATIC_METHOD_DEFINITION',
                            method: 'doNothing',
                            visibility: 'public',
                            args: [{
                                name: 'N_ARGUMENT',
                                type: 'ItemList',
                                variable: {
                                    name: 'N_VARIABLE',
                                    variable: 'items'
                                }
                            }],
                            body: {
                                name: 'N_COMPOUND_STATEMENT',
                                statements: []
                            }
                        }]
                    }]
                }
            },
            'empty method definition with one namespaced class type hinted arg but no statements': {
                code: util.heredoc(function () {/*<<<EOS
<?php
    class Thing {
        public static function doNothing(\Creator\Framework\Request $items) {}
    }
EOS
*/;}), // jshint ignore:line
                expectedAST: {
                    name: 'N_PROGRAM',
                    statements: [{
                        name: 'N_CLASS_STATEMENT',
                        className: 'Thing',
                        members: [{
                            name: 'N_STATIC_METHOD_DEFINITION',
                            method: 'doNothing',
                            visibility: 'public',
                            args: [{
                                name: 'N_ARGUMENT',
                                type: '\\Creator\\Framework\\Request',
                                variable: {
                                    name: 'N_VARIABLE',
                                    variable: 'items'
                                }
                            }],
                            body: {
                                name: 'N_COMPOUND_STATEMENT',
                                statements: []
                            }
                        }]
                    }]
                }
            }
        }, function (scenario, description) {
            describe(description, function () {
                // Pretty-print the code strings so any non-printable characters are readable
                describe('when the code is ' + JSON.stringify(scenario.code) + ' ?>', function () {
                    it('should return the expected AST', function () {
                        expect(parser.parse(scenario.code)).to.deep.equal(scenario.expectedAST);
                    });
                });
            });
        });
    });
});
