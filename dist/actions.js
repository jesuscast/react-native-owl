"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reload = exports.toExist = exports.scrollToEnd = exports.scrollTo = exports.changeText = exports.longPress = exports.press = void 0;
var config_1 = require("./cli/config");
var logger_1 = require("./logger");
var adb_1 = require("./utils/adb");
var wait_for_1 = require("./utils/wait-for");
var xcrun_1 = require("./utils/xcrun");
var websocket_1 = require("./websocket");
var logger = new logger_1.Logger(process.env.OWL_DEBUG === 'true');
var sendEvent = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var actionsWebSocketClient;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, websocket_1.createWebSocketClient)(logger, function (message) {
                                // Close this connection
                                actionsWebSocketClient.close();
                                // The message received here indicates the outcome of the action we sent to the app client
                                var event = JSON.parse(message);
                                switch (event.type) {
                                    case 'DONE':
                                        resolve(true);
                                        break;
                                    case 'NOT_FOUND':
                                        reject("Element not found: " + event.testID);
                                        break;
                                    case 'ERROR':
                                        reject("Element error: " + event.testID + " - " + event.message);
                                        break;
                                    default:
                                        reject('Unknown onMessage event type');
                                        break;
                                }
                            })];
                        case 1:
                            actionsWebSocketClient = _a.sent();
                            actionsWebSocketClient.send(JSON.stringify(event));
                            return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
var press = function (testID) {
    return sendEvent({ type: 'ACTION', action: 'PRESS', testID: testID });
};
exports.press = press;
var longPress = function (testID) {
    return sendEvent({ type: 'ACTION', action: 'LONG_PRESS', testID: testID });
};
exports.longPress = longPress;
var changeText = function (testID, value) {
    return sendEvent({ type: 'ACTION', action: 'CHANGE_TEXT', testID: testID, value: value });
};
exports.changeText = changeText;
var scrollTo = function (testID, value) {
    return sendEvent({ type: 'ACTION', action: 'SCROLL_TO', testID: testID, value: value });
};
exports.scrollTo = scrollTo;
var scrollToEnd = function (testID) {
    return sendEvent({ type: 'ACTION', action: 'SCROLL_TO_END', testID: testID });
};
exports.scrollToEnd = scrollToEnd;
var toExist = function (testID) {
    return sendEvent({ type: 'LAYOUT', action: 'EXISTS', testID: testID });
};
exports.toExist = toExist;
var reload = function () { return __awaiter(void 0, void 0, void 0, function () {
    var args, config;
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                args = global.OWL_CLI_ARGS;
                if (!args) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, config_1.getConfig)(args.config)];
            case 1:
                config = _j.sent();
                if (!(args.platform === 'ios')) return [3 /*break*/, 6];
                if (!((_a = config.ios) === null || _a === void 0 ? void 0 : _a.device)) {
                    return [2 /*return*/, Promise.reject('Missing device name')];
                }
                return [4 /*yield*/, (0, xcrun_1.xcrunTerminate)({
                        debug: config.debug,
                        binaryPath: (_b = config.ios) === null || _b === void 0 ? void 0 : _b.binaryPath,
                        device: config.ios.device,
                        scheme: (_c = config.ios) === null || _c === void 0 ? void 0 : _c.scheme,
                        configuration: (_d = config.ios) === null || _d === void 0 ? void 0 : _d.configuration,
                    })];
            case 2:
                _j.sent();
                return [4 /*yield*/, (0, xcrun_1.xcrunLaunch)({
                        debug: config.debug,
                        binaryPath: (_e = config.ios) === null || _e === void 0 ? void 0 : _e.binaryPath,
                        device: config.ios.device,
                        scheme: (_f = config.ios) === null || _f === void 0 ? void 0 : _f.scheme,
                        configuration: (_g = config.ios) === null || _g === void 0 ? void 0 : _g.configuration,
                    })];
            case 3:
                _j.sent();
                return [4 /*yield*/, (0, wait_for_1.waitFor)(1000)];
            case 4:
                _j.sent();
                return [4 /*yield*/, (0, xcrun_1.xcrunUi)({
                        debug: config.debug,
                        device: config.ios.device,
                        configuration: config.ios.configuration,
                        binaryPath: config.ios.binaryPath,
                    })];
            case 5:
                _j.sent();
                _j.label = 6;
            case 6:
                if (!(args.platform === 'android')) return [3 /*break*/, 10];
                if (!((_h = config.android) === null || _h === void 0 ? void 0 : _h.packageName)) {
                    return [2 /*return*/, Promise.reject('Missing package name')];
                }
                return [4 /*yield*/, (0, adb_1.adbTerminate)({
                        debug: config.debug,
                        packageName: config.android.packageName,
                    })];
            case 7:
                _j.sent();
                return [4 /*yield*/, (0, adb_1.adbLaunch)({
                        debug: config.debug,
                        packageName: config.android.packageName,
                    })];
            case 8:
                _j.sent();
                return [4 /*yield*/, (0, wait_for_1.waitFor)(1000)];
            case 9:
                _j.sent();
                _j.label = 10;
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.reload = reload;
