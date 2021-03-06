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
    '../../../../tools',
    'js/util'
], function (
    engineTools,
    phpTools,
    util
) {
    'use strict';

    describe('PHP Engine function_exists() builtin function integration', function () {
        var engine;

        function check(scenario) {
            engineTools.check(function () {
                return {
                    engine: engine
                };
            }, scenario);
        }

        beforeEach(function () {
            engine = phpTools.createEngine();
        });

        util.each({
            'empty string is not a defined function': {
                code: util.heredoc(function () {/*<<<EOS
<?php
return function_exists('');
EOS
*/;}), // jshint ignore:line
                expectedResult: false,
                expectedResultType: 'boolean',
                expectedStderr: '',
                expectedStdout: ''
            },
            'function_exists() function itself should be defined': {
                code: util.heredoc(function () {/*<<<EOS
<?php
return function_exists('function_exists');
EOS
*/;}), // jshint ignore:line
                expectedResult: true,
                expectedResultType: 'boolean',
                expectedStderr: '',
                expectedStdout: ''
            },
            'user-defined function should be defined': {
                code: util.heredoc(function () {/*<<<EOS
<?php
function myFunction() {}

return function_exists('myFunction');
EOS
*/;}), // jshint ignore:line
                expectedResult: true,
                expectedResultType: 'boolean',
                expectedStderr: '',
                expectedStdout: ''
            },
            'user-defined function in namespace should be defined': {
                code: util.heredoc(function () {/*<<<EOS
<?php
namespace My\Stuff {
    function theFunction() {}
}

namespace {
    return function_exists('My\Stuff\theFunction');
}
EOS
*/;}), // jshint ignore:line
                expectedResult: true,
                expectedResultType: 'boolean',
                expectedStderr: '',
                expectedStdout: ''
            },
            'user-defined function with same name in different namespace should be defined': {
                code: util.heredoc(function () {/*<<<EOS
<?php
namespace Your\Stuff {
    function theFunction() {}
}

namespace {
    return function_exists('My\Stuff\theFunction');
}
EOS
*/;}), // jshint ignore:line
                expectedResult: false,
                expectedResultType: 'boolean',
                expectedStderr: '',
                expectedStdout: ''
            },
            'standard global function when prefixed with backslash': {
                code: util.heredoc(function () {/*<<<EOS
<?php
return function_exists('\strlen');
EOS
*/;}), // jshint ignore:line
                expectedResult: true,
                expectedResultType: 'boolean',
                expectedStderr: '',
                expectedStdout: ''
            }
        }, function (scenario, description) {
            describe(description, function () {
                check(scenario);
            });
        });
    });
});
