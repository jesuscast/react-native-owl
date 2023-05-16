"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
var websocket = __importStar(require("./websocket"));
describe('actions.ts', function () {
    var onMessageCallback;
    var send = jest.fn();
    var close = jest.fn();
    jest.spyOn(websocket, 'createWebSocketClient').mockImplementation(
    // @ts-ignore
    function (logger, onMessage) {
        onMessageCallback(onMessage);
        return Promise.resolve({ send: send, close: close });
    });
    beforeEach(function () {
        jest.clearAllMocks();
        onMessageCallback = function (onMessage) {
            setTimeout(function () {
                return onMessage(JSON.stringify({
                    type: 'DONE',
                }));
            });
        };
    });
    describe('general onMessage handling', function () {
        it('resolves when client sends DONE', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, actions_1.press)('testID')];
                    case 1:
                        _a.sent();
                        expect(send).toHaveBeenCalledWith(JSON.stringify({ type: 'ACTION', action: 'PRESS', testID: 'testID' }));
                        expect(close).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('rejects when client sends NOT_FOUND', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                onMessageCallback = function (onMessage) {
                    setTimeout(function () {
                        return onMessage(JSON.stringify({
                            type: 'NOT_FOUND',
                            testID: 'testID',
                        }));
                    });
                };
                expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, actions_1.press)('testID')];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }).rejects.toBeTruthy();
                return [2 /*return*/];
            });
        }); });
        it('rejects when client sends ERROR', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                onMessageCallback = function (onMessage) {
                    setTimeout(function () {
                        return onMessage(JSON.stringify({
                            type: 'ERROR',
                            testID: 'testID',
                        }));
                    });
                };
                expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, actions_1.press)('testID')];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }).rejects.toBeTruthy();
                return [2 /*return*/];
            });
        }); });
        it('rejects when client sends an unknown event', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                onMessageCallback = function (onMessage) {
                    setTimeout(function () {
                        return onMessage(JSON.stringify({
                            type: 'UNKNOWN',
                            testID: 'testID',
                        }));
                    });
                };
                expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, actions_1.press)('testID')];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }).rejects.toBeTruthy();
                return [2 /*return*/];
            });
        }); });
    });
    describe('actions', function () {
        it('sends press event', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, actions_1.press)('testID')];
                    case 1:
                        _a.sent();
                        expect(send).toHaveBeenCalledWith(JSON.stringify({ type: 'ACTION', action: 'PRESS', testID: 'testID' }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('sends longPress event', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, actions_1.longPress)('testID')];
                    case 1:
                        _a.sent();
                        expect(send).toHaveBeenCalledWith(JSON.stringify({
                            type: 'ACTION',
                            action: 'LONG_PRESS',
                            testID: 'testID',
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('sends changeText event', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, actions_1.changeText)('testID', 'text')];
                    case 1:
                        _a.sent();
                        expect(send).toHaveBeenCalledWith(JSON.stringify({
                            type: 'ACTION',
                            action: 'CHANGE_TEXT',
                            testID: 'testID',
                            value: 'text',
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('sends scrollTo event', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, actions_1.scrollTo)('testID', { y: 10 })];
                    case 1:
                        _a.sent();
                        expect(send).toHaveBeenCalledWith(JSON.stringify({
                            type: 'ACTION',
                            action: 'SCROLL_TO',
                            testID: 'testID',
                            value: { y: 10 },
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('sends scrollToEnd event', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, actions_1.scrollToEnd)('testID')];
                    case 1:
                        _a.sent();
                        expect(send).toHaveBeenCalledWith(JSON.stringify({
                            type: 'ACTION',
                            action: 'SCROLL_TO_END',
                            testID: 'testID',
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('sends toExist event', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, actions_1.toExist)('testID')];
                    case 1:
                        _a.sent();
                        expect(send).toHaveBeenCalledWith(JSON.stringify({
                            type: 'LAYOUT',
                            action: 'EXISTS',
                            testID: 'testID',
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
