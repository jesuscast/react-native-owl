"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../logger");
var trackedElements_1 = require("./trackedElements");
describe('trackedElements.ts', function () {
    var logger = new logger_1.Logger(false);
    it('should check for and return elements that have been added', function () {
        var testElement = { ref: { current: null } };
        expect((0, trackedElements_1.get)('testId')).toBeFalsy();
        (0, trackedElements_1.add)(logger, 'testId', testElement);
        expect((0, trackedElements_1.get)('testId')).toEqual(testElement);
    });
});
