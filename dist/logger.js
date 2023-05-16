"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var Logger = /** @class */ (function () {
    function Logger(isEnabled) {
        if (isEnabled === void 0) { isEnabled = false; }
        this.isEnabled = isEnabled;
    }
    /** Will only output when the debug flag in the config is on. */
    Logger.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (this.isEnabled) {
            console.info.apply(console, __spreadArray([message], optionalParams, false));
        }
    };
    /** Will only output when the debug flag in the config is on. */
    Logger.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (this.isEnabled) {
            console.warn.apply(console, __spreadArray([message], optionalParams, false));
        }
    };
    /** Will only output when the debug flag in the config is on. */
    Logger.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (this.isEnabled) {
            console.error.apply(console, __spreadArray([message], optionalParams, false));
        }
    };
    /** Will always print output to the terminal - not depending on the debug flag. */
    Logger.prototype.print = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.log.apply(console, __spreadArray([message], optionalParams, false));
    };
    return Logger;
}());
exports.Logger = Logger;
