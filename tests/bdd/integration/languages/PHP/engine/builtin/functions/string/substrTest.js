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

    describe('PHP Engine substr() builtin function integration', function () {
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
            'from offset 0, no length': {
                code: util.heredoc(function () {/*<<<EOS
<?php
return substr('Hello world!', 0);
EOS
*/;}), // jshint ignore:line
                expectedResult: 'Hello world!',
                expectedResultType: 'string',
                expectedStderr: '',
                expectedStdout: ''
            },
            'from positive offset, no length': {
                code: util.heredoc(function () {/*<<<EOS
<?php
return substr('Hello there!', 4);
EOS
*/;}), // jshint ignore:line
                expectedResult: 'o there!',
                expectedResultType: 'string',
                expectedStderr: '',
                expectedStdout: ''
            },
            'from positive offset, with length': {
                code: util.heredoc(function () {/*<<<EOS
<?php
return substr('Hello there!', 4, 5);
EOS
*/;}), // jshint ignore:line
                expectedResult: 'o the',
                expectedResultType: 'string',
                expectedStderr: '',
                expectedStdout: ''
            },
            'from positive offset, with negative length': {
                code: util.heredoc(function () {/*<<<EOS
<?php
return substr('Hello there!', 3, -4);
EOS
*/;}), // jshint ignore:line
                expectedResult: 'lo th',
                expectedResultType: 'string',
                expectedStderr: '',
                expectedStdout: ''
            },
            'from negative offset, with length': {
                code: util.heredoc(function () {/*<<<EOS
<?php
return substr('Hello there!', -4, 2);
EOS
*/;}), // jshint ignore:line
                expectedResult: 'er',
                expectedResultType: 'string',
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
