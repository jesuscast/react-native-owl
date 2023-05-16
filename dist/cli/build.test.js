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
var path_1 = __importDefault(require("path"));
var execa_1 = __importDefault(require("execa"));
var build_1 = require("./build");
var logger_1 = require("../logger");
var configHelpers = __importStar(require("./config"));
describe('build.ts', function () {
    var logger = new logger_1.Logger();
    var execMock = jest.spyOn(execa_1.default, 'command').mockImplementation();
    beforeEach(function () {
        execMock.mockReset();
    });
    describe('buildIOS', function () {
        it('builds an iOS project with workspace/scheme', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            ios: {
                                workspace: 'ios/RNDemo.xcworkspace',
                                scheme: 'RNDemo',
                                configuration: 'Debug',
                                device: 'iPhone Simulator',
                                env: { ENTRY_FILE: build_1.ENTRY_FILE },
                            },
                        };
                        return [4 /*yield*/, (0, build_1.buildIOS)(config, logger)];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith("xcodebuild -workspace ios/RNDemo.xcworkspace -scheme RNDemo -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build", { stdio: 'inherit', env: { ENTRY_FILE: build_1.ENTRY_FILE } });
                        return [2 /*return*/];
                }
            });
        }); });
        it('builds an iOS project with workspace/scheme - with the quiet arg', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            ios: {
                                workspace: 'ios/RNDemo.xcworkspace',
                                scheme: 'RNDemo',
                                configuration: 'Debug',
                                quiet: true,
                                device: 'iPhone Simulator',
                                env: { ENTRY_FILE: build_1.ENTRY_FILE },
                            },
                        };
                        return [4 /*yield*/, (0, build_1.buildIOS)(config, logger)];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith("xcodebuild -workspace ios/RNDemo.xcworkspace -scheme RNDemo -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build -quiet", {
                            stdio: 'inherit',
                            env: { ENTRY_FILE: build_1.ENTRY_FILE },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('builds an iOS project with a custom build command', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            ios: {
                                buildCommand: "echo 'Hello World'",
                                device: 'iPhone Simulator',
                                env: { ENTRY_FILE: build_1.ENTRY_FILE },
                            },
                        };
                        return [4 /*yield*/, (0, build_1.buildIOS)(config, logger)];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith("echo 'Hello World'", {
                            stdio: 'inherit',
                            env: { ENTRY_FILE: build_1.ENTRY_FILE },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('buildAndroid', function () {
        it('builds an Android project with the default build command', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            android: {
                                packageName: 'com.rndemo',
                                env: { ENTRY_FILE: build_1.ENTRY_FILE },
                            },
                        };
                        return [4 /*yield*/, (0, build_1.buildAndroid)(config, logger)];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith("./gradlew assembleRelease --console plain -PisOwlBuild=true", {
                            stdio: 'inherit',
                            cwd: path_1.default.join(process.cwd(), 'android'),
                            env: { ENTRY_FILE: build_1.ENTRY_FILE },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('builds an Android project with the default build command - with the quiet arg', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            android: {
                                packageName: 'com.rndemo',
                                quiet: true,
                                env: { ENTRY_FILE: build_1.ENTRY_FILE },
                            },
                        };
                        return [4 /*yield*/, (0, build_1.buildAndroid)(config, logger)];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith("./gradlew assembleRelease --console plain --quiet -PisOwlBuild=true", {
                            stdio: 'inherit',
                            cwd: path_1.default.join(process.cwd(), 'android'),
                            env: { ENTRY_FILE: build_1.ENTRY_FILE },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('builds an Android project with a custom build command', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            android: {
                                packageName: 'com.rndemo',
                                buildCommand: "echo 'Hello World'",
                                env: { ENTRY_FILE: build_1.ENTRY_FILE },
                            },
                        };
                        return [4 /*yield*/, (0, build_1.buildAndroid)(config, logger)];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith("echo 'Hello World' -PisOwlBuild=true", {
                            stdio: 'inherit',
                            env: { ENTRY_FILE: build_1.ENTRY_FILE },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('buildHandler', function () {
        var args = {
            platform: 'ios',
            config: './owl.config.json',
        };
        var config = {
            ios: {
                buildCommand: "echo 'Hello World'",
                device: 'iPhone Simulator',
                env: {
                    ENTRY_FILE: './node_modules/react-native-owl/dist/client/index.app.js',
                },
            },
            android: {
                packageName: 'com.rndemo',
                buildCommand: "echo 'Hello World'",
                env: {
                    ENTRY_FILE: './node_modules/react-native-owl/dist/client/index.app.js',
                },
            },
        };
        jest.spyOn(logger_1.Logger.prototype, 'print').mockImplementation();
        it('builds an iOS project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var call;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(configHelpers, 'getConfig').mockResolvedValueOnce(config);
                        call = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, (0, build_1.buildHandler)(args)];
                        }); }); };
                        return [4 /*yield*/, expect(call()).resolves.not.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('builds an Android project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var call;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(configHelpers, 'getConfig').mockResolvedValueOnce(config);
                        call = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, (0, build_1.buildHandler)(__assign(__assign({}, args), { platform: 'android' }))];
                        }); }); };
                        return [4 /*yield*/, expect(call()).resolves.not.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
