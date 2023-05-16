"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.get = void 0;
/**
 * A masic map of tracked elements, that we use to keep track of elements
 * so that we can perform actions on them in future
 */
var trackedElements = {};
var get = function (ID) {
    return trackedElements[ID];
};
exports.get = get;
var add = function (logger, ID, data) {
    trackedElements[ID] = data;
    logger.info("[OWL - Tracker] Tracking element with " + ID);
};
exports.add = add;
