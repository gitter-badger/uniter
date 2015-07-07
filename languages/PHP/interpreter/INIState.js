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
    'js/util'
], function (
    util
) {
    'use strict';

    function INIState() {
        this.settings = {
            'include_path': '.'
        };
    }

    util.extend(INIState.prototype, {
        get: function (name) {
            return this.settings[name];
        },

        set: function (name, value) {
            this.settings[name] = value;
        }
    });

    return INIState;
});
