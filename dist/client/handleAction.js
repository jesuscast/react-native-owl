"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAction = void 0;
/**
 * When we call onPress/onLongPress, the function expects an `event` arg of type `GestureResponderEvent`.
 * To try to prevent errors in where the onPress/onLongPress function uses the event data, we create some mock event data.
 */
var getGestureResponderEvent = function () { return ({
    nativeEvent: {
        changedTouches: [],
        identifier: 'OWL-identifier',
        locationX: 0,
        locationY: 0,
        pageX: 0,
        pageY: 0,
        target: 'OWL-target',
        timestamp: Date.now(),
        touches: [],
    },
    currentTarget: 0,
    target: 0,
    bubbles: false,
    cancelable: false,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: true,
    preventDefault: function () { },
    isDefaultPrevented: function () { return false; },
    stopPropagation: function () { },
    isPropagationStopped: function () { return false; },
    persist: function () { },
    timeStamp: Date.now(),
    type: 'RCTView',
}); };
/**
 * This function handles the individual actions that are requested in the jest tests.
 * For each action, we first check that we have the method and value required to perform the action.
 * Then we perform it, normally by calling the callback being used for a specific element prop,
 * or by calling a method on the element's ref.
 * The thrown error message will be displayed in the jest test results.
 */
var handleAction = function (logger, testID, element, action, value) {
    var _a, _b;
    logger.info("[OWL - Client] Executing " + action + " on element with testID " + testID);
    switch (action) {
        case 'PRESS':
            if (!element.onPress) {
                throw new Error("This element has no onPress prop");
            }
            element.onPress(getGestureResponderEvent());
            break;
        case 'LONG_PRESS':
            if (!element.onLongPress) {
                throw new Error("This element has no onLongPress prop");
            }
            element.onLongPress(getGestureResponderEvent());
            break;
        case 'CHANGE_TEXT':
            if (!element.onChangeText) {
                throw new Error("This element has no onChangeText prop");
            }
            element.onChangeText(typeof value === 'undefined' ? '' : value.toString());
            break;
        case 'SCROLL_TO':
            if (!((_a = element.ref.current) === null || _a === void 0 ? void 0 : _a.scrollTo)) {
                throw new Error("This element has no scrollTo method");
            }
            if (typeof value !== 'object' ||
                (value.x === undefined && value.y === undefined)) {
                throw new Error("Value must include x and/or y properties");
            }
            element.ref.current.scrollTo(__assign(__assign({}, value), { animated: false }));
            break;
        case 'SCROLL_TO_END':
            if (!((_b = element.ref.current) === null || _b === void 0 ? void 0 : _b.scrollToEnd)) {
                throw new Error("This element has no scrollToEnd method");
            }
            element.ref.current.scrollToEnd({ animated: false });
            break;
        default:
            throw new Error("Action '" + action + "' not supported ");
    }
};
exports.handleAction = handleAction;
