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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var reportHelpers = __importStar(require("../report"));
var configHelpers = __importStar(require("./config"));
var run = __importStar(require("./run"));
var xcrun = __importStar(require("../utils/xcrun"));
var adb = __importStar(require("../utils/adb"));
var execa_1 = __importDefault(require("execa"));
var logger_1 = require("../logger");
jest.mock('../utils/xcrun');
jest.mock('../utils/adb');
jest
    .spyOn(process, 'cwd')
    .mockReturnValue('/Users/johndoe/Projects/my-project');
describe('run.ts', function () {
    var mkdirMock = jest.spyOn(fs_1.promises, 'mkdir');
    var execKillMock = {
        kill: jest.fn(),
    };
    var execMock = jest.spyOn(execa_1.default, 'command').mockImplementation();
    beforeEach(function () {
        mkdirMock.mockReset();
        execMock.mockReset().mockReturnValue(execKillMock);
        jest.clearAllMocks();
    });
    describe('runIOS', function () {
        it('runs an iOS project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            return __generator(this, function (_q) {
                switch (_q.label) {
                    case 0:
                        config = {
                            ios: {
                                workspace: 'ios/RNDemo.xcworkspace',
                                scheme: 'RNDemo',
                                configuration: 'Debug',
                                device: 'iPhone Simulator',
                            },
                        };
                        return [4 /*yield*/, run.runIOS(config)];
                    case 1:
                        _q.sent();
                        expect(xcrun.xcrunStatusBar).toHaveBeenCalledTimes(1);
                        expect(xcrun.xcrunStatusBar).toHaveBeenCalledWith({
                            debug: config.debug,
                            device: (_a = config.ios) === null || _a === void 0 ? void 0 : _a.device,
                            configuration: (_b = config.ios) === null || _b === void 0 ? void 0 : _b.configuration,
                            binaryPath: (_c = config.ios) === null || _c === void 0 ? void 0 : _c.binaryPath,
                        });
                        expect(xcrun.xcrunInstall).toHaveBeenCalledTimes(1);
                        expect(xcrun.xcrunInstall).toHaveBeenCalledWith({
                            debug: config.debug,
                            device: (_d = config.ios) === null || _d === void 0 ? void 0 : _d.device,
                            configuration: (_e = config.ios) === null || _e === void 0 ? void 0 : _e.configuration,
                            binaryPath: (_f = config.ios) === null || _f === void 0 ? void 0 : _f.binaryPath,
                            scheme: (_g = config.ios) === null || _g === void 0 ? void 0 : _g.scheme,
                        });
                        expect(xcrun.xcrunLaunch).toHaveBeenCalledTimes(1);
                        expect(xcrun.xcrunLaunch).toHaveBeenCalledWith({
                            debug: config.debug,
                            device: (_h = config.ios) === null || _h === void 0 ? void 0 : _h.device,
                            configuration: (_j = config.ios) === null || _j === void 0 ? void 0 : _j.configuration,
                            binaryPath: (_k = config.ios) === null || _k === void 0 ? void 0 : _k.binaryPath,
                            scheme: (_l = config.ios) === null || _l === void 0 ? void 0 : _l.scheme,
                        });
                        expect(xcrun.xcrunUi).toHaveBeenCalledTimes(1);
                        expect(xcrun.xcrunUi).toHaveBeenCalledWith({
                            debug: config.debug,
                            device: (_m = config.ios) === null || _m === void 0 ? void 0 : _m.device,
                            configuration: (_o = config.ios) === null || _o === void 0 ? void 0 : _o.configuration,
                            binaryPath: (_p = config.ios) === null || _p === void 0 ? void 0 : _p.binaryPath,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('restoreIOSUI', function () {
        it('cleans up an iOS project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var logger, config;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        logger = new logger_1.Logger();
                        config = {
                            ios: {
                                workspace: 'ios/RNDemo.xcworkspace',
                                scheme: 'RNDemo',
                                configuration: 'Debug',
                                device: 'iPhone Simulator',
                            },
                        };
                        return [4 /*yield*/, run.restoreIOSUI(config, logger)];
                    case 1:
                        _d.sent();
                        expect(xcrun.xcrunRestore).toHaveBeenCalledTimes(1);
                        expect(xcrun.xcrunRestore).toHaveBeenCalledWith({
                            debug: config.debug,
                            device: (_a = config.ios) === null || _a === void 0 ? void 0 : _a.device,
                            configuration: (_b = config.ios) === null || _b === void 0 ? void 0 : _b.configuration,
                            binaryPath: (_c = config.ios) === null || _c === void 0 ? void 0 : _c.binaryPath,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('runAndroid', function () {
        it('runs an Android project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        config = {
                            android: {
                                packageName: 'com.rndemo',
                                buildType: 'Release',
                            },
                        };
                        return [4 /*yield*/, run.runAndroid(config)];
                    case 1:
                        _d.sent();
                        expect(adb.adbInstall).toHaveBeenCalledTimes(1);
                        expect(adb.adbInstall).toHaveBeenCalledWith({
                            debug: config.debug,
                            buildType: (_a = config.android) === null || _a === void 0 ? void 0 : _a.buildType,
                            binaryPath: (_b = config.android) === null || _b === void 0 ? void 0 : _b.binaryPath,
                        });
                        expect(adb.adbLaunch).toHaveBeenCalledTimes(1);
                        expect(adb.adbLaunch).toHaveBeenCalledWith({
                            debug: config.debug,
                            packageName: (_c = config.android) === null || _c === void 0 ? void 0 : _c.packageName,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('runHandler', function () {
        var args = {
            platform: 'ios',
            config: './owl.config.json',
            update: false,
        };
        var config = {
            ios: {
                workspace: 'ios/RNDemo.xcworkspace',
                scheme: 'RNDemo',
                device: 'iPhone Simulator',
            },
            android: {
                packageName: 'com.rndemo',
                buildCommand: "echo 'Hello World'",
            },
        };
        var jestConfigPath = path_1.default.join(__dirname, '..', 'jest-config.json');
        var expectedJestCommand = "jest --config=" + jestConfigPath + " --roots=" + path_1.default.join(process.cwd()) + " --runInBand";
        var commandSyncMock = jest.spyOn(execa_1.default, 'commandSync');
        var mockGenerateReport = jest.spyOn(reportHelpers, 'generateReport');
        jest.spyOn(logger_1.Logger.prototype, 'print').mockImplementation();
        beforeEach(function () {
            commandSyncMock.mockReset();
            mockGenerateReport.mockReset();
        });
        it('runs an iOS project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockRunIOS, mockRestoreIOSUI;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest
                            .spyOn(configHelpers, 'getConfig')
                            .mockResolvedValueOnce(__assign(__assign({}, config), { report: true }));
                        mockRunIOS = jest.spyOn(run, 'runIOS').mockResolvedValueOnce();
                        mockRestoreIOSUI = jest
                            .spyOn(run, 'restoreIOSUI')
                            .mockResolvedValueOnce();
                        mkdirMock.mockResolvedValue(undefined);
                        return [4 /*yield*/, run.runHandler(args)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(mkdirMock).toHaveBeenCalled()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, expect(mockRunIOS).toHaveBeenCalled()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, expect(commandSyncMock).toHaveBeenCalledTimes(1)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, expect(commandSyncMock).toHaveBeenCalledWith(expectedJestCommand + " --globals='{\"OWL_CLI_ARGS\":{\"platform\":\"ios\",\"config\":\"./owl.config.json\",\"update\":false}}' --json --outputFile=/Users/johndoe/Projects/my-project/.owl/report/jest-report.json", {
                                env: {
                                    OWL_DEBUG: 'false',
                                    OWL_IOS_SIMULATOR: 'iPhone Simulator',
                                    OWL_PLATFORM: 'ios',
                                    OWL_UPDATE_BASELINE: 'false',
                                },
                                stdio: 'inherit',
                            })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, expect(mockRestoreIOSUI).toHaveBeenCalled()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('runs an Android project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockRunAndroid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(configHelpers, 'getConfig').mockResolvedValueOnce(config);
                        mockRunAndroid = jest
                            .spyOn(run, 'runAndroid')
                            .mockResolvedValueOnce();
                        return [4 /*yield*/, run.runHandler(__assign(__assign({}, args), { platform: 'android' }))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(mockRunAndroid).toHaveBeenCalled()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, expect(commandSyncMock).toHaveBeenCalledTimes(1)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, expect(commandSyncMock).toHaveBeenCalledWith(expectedJestCommand + " --globals='{\"OWL_CLI_ARGS\":{\"platform\":\"android\",\"config\":\"./owl.config.json\",\"update\":false}}'", {
                                env: {
                                    OWL_DEBUG: 'false',
                                    OWL_IOS_SIMULATOR: 'iPhone Simulator',
                                    OWL_PLATFORM: 'android',
                                    OWL_UPDATE_BASELINE: 'false',
                                },
                                stdio: 'inherit',
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('runs with the update baseline flag on', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockRunIOS;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(configHelpers, 'getConfig').mockResolvedValueOnce(config);
                        mockRunIOS = jest.spyOn(run, 'runIOS').mockResolvedValueOnce();
                        return [4 /*yield*/, run.runHandler(__assign(__assign({}, args), { update: true }))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(mockRunIOS).toHaveBeenCalled()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, expect(commandSyncMock).toHaveBeenCalledTimes(1)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, expect(commandSyncMock).toHaveBeenCalledWith(expectedJestCommand + " --globals='{\"OWL_CLI_ARGS\":{\"platform\":\"ios\",\"config\":\"./owl.config.json\",\"update\":true}}'", {
                                env: {
                                    OWL_DEBUG: 'false',
                                    OWL_IOS_SIMULATOR: 'iPhone Simulator',
                                    OWL_PLATFORM: 'ios',
                                    OWL_UPDATE_BASELINE: 'true',
                                },
                                stdio: 'inherit',
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('runs the scripts/websocket-server.js script', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(configHelpers, 'getConfig').mockResolvedValueOnce(config);
                        return [4 /*yield*/, run.runHandler(__assign({}, args))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(execMock.mock.calls[0][0]).toEqual('node scripts/websocket-server.js')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('runs generates the report if the config is set to on', function () { return __awaiter(void 0, void 0, void 0, function () {
            var caseConfig, mockRunIOS, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        caseConfig = __assign(__assign({}, config), { report: true });
                        jest.spyOn(configHelpers, 'getConfig').mockResolvedValueOnce(caseConfig);
                        mockRunIOS = jest.spyOn(run, 'runIOS').mockResolvedValueOnce();
                        commandSyncMock.mockRejectedValueOnce(undefined);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 7]);
                        return [4 /*yield*/, run.runHandler(__assign(__assign({}, args), { update: true }))];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        _a = _b.sent();
                        return [4 /*yield*/, expect(mockRunIOS).toHaveBeenCalled()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, expect(commandSyncMock).toHaveBeenCalledTimes(1)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, expect(mockGenerateReport).toHaveBeenCalledTimes(1)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        it('does not generate the report if the config is set to off', function () { return __awaiter(void 0, void 0, void 0, function () {
            var caseConfig, mockRunIOS, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        caseConfig = __assign(__assign({}, config), { report: false });
                        jest.spyOn(configHelpers, 'getConfig').mockResolvedValueOnce(caseConfig);
                        mockRunIOS = jest.spyOn(run, 'runIOS').mockResolvedValueOnce();
                        commandSyncMock.mockRejectedValueOnce(undefined);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 9]);
                        return [4 /*yield*/, run.runHandler(__assign({}, args))];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 3:
                        _a = _b.sent();
                        return [4 /*yield*/, expect(commandSyncMock).toHaveBeenCalledWith(expectedJestCommand + " --globals='{\"OWL_CLI_ARGS\":{\"platform\":\"ios\",\"config\":\"./owl.config.json\",\"update\":false}}'", {
                                env: {
                                    OWL_DEBUG: 'false',
                                    OWL_IOS_SIMULATOR: 'iPhone Simulator',
                                    OWL_PLATFORM: 'ios',
                                    OWL_UPDATE_BASELINE: 'false',
                                },
                                stdio: 'inherit',
                            })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, expect(mockRunIOS).toHaveBeenCalled()];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, expect(commandSyncMock).toHaveBeenCalledTimes(1)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, expect(mkdirMock).not.toHaveBeenCalled()];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, expect(mockGenerateReport).not.toHaveBeenCalled()];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); });
    });
});
