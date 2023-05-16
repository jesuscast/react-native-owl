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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = exports.waitForWebSocket = exports.patchReact = exports.applyJsxChildrenElementTracking = exports.applyElementTracking = exports.initClient = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var logger_1 = require("../logger");
var constants_1 = require("./constants");
var websocket_1 = require("./websocket");
var trackedElements_1 = require("./trackedElements");
var handleAction_1 = require("./handleAction");
var logger = new logger_1.Logger(true);
var isReactUpdating = true;
var owlClient;
var initClient = function () {
    logger.info('[OWL - Client] Initialising OWL client');
    (0, exports.patchReact)();
    (0, exports.waitForWebSocket)();
};
exports.initClient = initClient;
/**
 * Based on an elements props, store element tracking data and return updated props
 */
var applyElementTracking = function (props, isJsx) {
    if (isJsx === void 0) { isJsx = false; }
    if (isJsx) {
        (0, exports.applyJsxChildrenElementTracking)(props);
    }
    var testID = props === null || props === void 0 ? void 0 : props.testID;
    var returnProps = __assign(__assign({}, props), { showsHorizontalScrollIndicator: false, showsVerticalScrollIndicator: false });
    if (!testID) {
        return returnProps;
    }
    var existingTrackedElement = (0, trackedElements_1.get)(testID);
    var ref = (props === null || props === void 0 ? void 0 : props.ref) ||
        (existingTrackedElement === null || existingTrackedElement === void 0 ? void 0 : existingTrackedElement.ref) ||
        react_1.default.createRef();
    var trackData = {
        ref: (existingTrackedElement === null || existingTrackedElement === void 0 ? void 0 : existingTrackedElement.ref) || ref,
        onPress: (existingTrackedElement === null || existingTrackedElement === void 0 ? void 0 : existingTrackedElement.onPress) || (props === null || props === void 0 ? void 0 : props.onPress),
        onLongPress: (existingTrackedElement === null || existingTrackedElement === void 0 ? void 0 : existingTrackedElement.onLongPress) || (props === null || props === void 0 ? void 0 : props.onLongPress),
        onChangeText: (existingTrackedElement === null || existingTrackedElement === void 0 ? void 0 : existingTrackedElement.onChangeText) || (props === null || props === void 0 ? void 0 : props.onChangeText),
    };
    (0, trackedElements_1.add)(logger, testID, trackData);
    return __assign(__assign({}, returnProps), { ref: ref });
};
exports.applyElementTracking = applyElementTracking;
/**
 * To get access to the prop callbacks when the element is created, we need to check the children
 */
var applyJsxChildrenElementTracking = function (props) {
    if (props.children && Array.isArray(props.children)) {
        props.children.forEach(function (child) {
            var _a, _b, _c, _d, _e;
            var testID = (_a = child === null || child === void 0 ? void 0 : child.props) === null || _a === void 0 ? void 0 : _a.testID;
            if (!testID) {
                return;
            }
            var existingTrackedElement = (0, trackedElements_1.get)(testID);
            var ref = ((_b = child === null || child === void 0 ? void 0 : child.props) === null || _b === void 0 ? void 0 : _b.ref) ||
                (existingTrackedElement === null || existingTrackedElement === void 0 ? void 0 : existingTrackedElement.ref) ||
                react_1.default.createRef();
            var trackData = {
                ref: (existingTrackedElement === null || existingTrackedElement === void 0 ? void 0 : existingTrackedElement.ref) || ref,
                onPress: (existingTrackedElement === null || existingTrackedElement === void 0 ? void 0 : existingTrackedElement.onPress) || ((_c = child === null || child === void 0 ? void 0 : child.props) === null || _c === void 0 ? void 0 : _c.onPress),
                onLongPress: (existingTrackedElement === null || existingTrackedElement === void 0 ? void 0 : existingTrackedElement.onLongPress) || ((_d = child === null || child === void 0 ? void 0 : child.props) === null || _d === void 0 ? void 0 : _d.onLongPress),
                onChangeText: (existingTrackedElement === null || existingTrackedElement === void 0 ? void 0 : existingTrackedElement.onChangeText) || ((_e = child === null || child === void 0 ? void 0 : child.props) === null || _e === void 0 ? void 0 : _e.onChangeText),
            };
            (0, trackedElements_1.add)(logger, testID, trackData);
        });
    }
};
exports.applyJsxChildrenElementTracking = applyJsxChildrenElementTracking;
/**
 * We patch react so that we can maintain a list of elements that have testID's
 * We can then use this list to find the element when we receive an action
 */
var patchReact = function () {
    var originalReactCreateElement = react_1.default.createElement;
    var automateTimeout;
    if (parseInt(react_1.default.version.split('.')[0], 10) >= 18) {
        var jsxRuntime = require('react/jsx-runtime');
        var origJsx_1 = jsxRuntime.jsx;
        // @ts-ignore
        jsxRuntime.jsx = function (type, config, maybeKey) {
            var newProps = (0, exports.applyElementTracking)(config, true);
            clearTimeout(automateTimeout);
            automateTimeout = setTimeout(function () {
                isReactUpdating = false;
            }, constants_1.CHECK_INTERVAL);
            isReactUpdating = true;
            return origJsx_1(type, newProps, maybeKey);
        };
    }
    // @ts-ignore
    react_1.default.createElement = function (type, props) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        var newProps = (0, exports.applyElementTracking)(props);
        clearTimeout(automateTimeout);
        automateTimeout = setTimeout(function () {
            isReactUpdating = false;
        }, constants_1.CHECK_INTERVAL);
        isReactUpdating = true;
        return originalReactCreateElement.apply(void 0, __spreadArray([type, newProps], children, false));
    };
};
exports.patchReact = patchReact;
/**
 * The app might launch before the OWL server starts, so we need to keep trying...
 */
var waitForWebSocket = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, websocket_1.initWebSocket)(logger, react_native_1.Platform.OS === 'android' ? 'android' : 'ios', exports.handleMessage)];
            case 1:
                owlClient = _b.sent();
                logger.info('[OWL - Websocket] Connection established');
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                setTimeout(exports.waitForWebSocket, constants_1.SOCKET_WAIT_TIMEOUT);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.waitForWebSocket = waitForWebSocket;
/**
 * When we receive a message, we need to find the element that corresponds to the testID,
 * then attempt to handle the requested action on it.
 */
var handleMessage = function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var socketEvent, testID, element, error_1, message_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                socketEvent = JSON.parse(message);
                testID = socketEvent.testID;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, getElementByTestId(testID)];
            case 2:
                element = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                sendNotFound(testID);
                return [3 /*break*/, 4];
            case 4:
                if (element) {
                    try {
                        if (socketEvent.type === 'ACTION') {
                            (0, handleAction_1.handleAction)(logger, testID, element, socketEvent.action, socketEvent.value);
                            setTimeout(sendDone, 1000);
                        }
                        else {
                            sendDone();
                        }
                    }
                    catch (error) {
                        message_1 = 'Unknown error';
                        if (error instanceof Error) {
                            message_1 = error.message;
                        }
                        sendError(testID, message_1);
                    }
                }
                return [2 /*return*/];
        }
    });
}); };
exports.handleMessage = handleMessage;
var sendEvent = function (event) {
    return owlClient.send(JSON.stringify(event));
};
var sendNotFound = function (testID) {
    return sendEvent({ type: 'NOT_FOUND', testID: testID });
};
var sendDone = function () { return sendEvent({ type: 'DONE' }); };
var sendError = function (testID, message) {
    return sendEvent({ type: 'ERROR', testID: testID, message: message });
};
/**
 * This function resolves the tracked element by its testID, so that we can handle events on it.
 * If the element is not immedietly available, we wait for it to be available for some time.
 */
var getElementByTestId = function (testID) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                logger.info("[OWL - Client] Looking for Element with testID " + testID);
                var rejectTimeout = setTimeout(function () {
                    logger.error("[OWL - Client] \u274C not found");
                    clearInterval(checkInterval);
                    reject(new Error("Element with testID " + testID + " not found"));
                }, constants_1.MAX_CHECK_TIMEOUT);
                var checkInterval = setInterval(function () {
                    var element = (0, trackedElements_1.get)(testID);
                    if (isReactUpdating || !element) {
                        return;
                    }
                    logger.info("[OWL - Client] \u2713 found");
                    clearInterval(checkInterval);
                    clearTimeout(rejectTimeout);
                    resolve(element);
                }, constants_1.CHECK_INTERVAL);
            })];
    });
}); };
