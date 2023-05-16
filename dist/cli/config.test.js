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
var fs_1 = require("fs");
var config_1 = require("./config");
describe('config.ts', function () {
    describe('validateSchema', function () {
        it('validates a config', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, validate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            ios: {
                                buildCommand: 'echo "Hello iOS"',
                                binaryPath: '',
                                device: 'iPhone Simulator',
                            },
                            android: {
                                packageName: 'com.rndemo',
                                buildCommand: 'echo "Hello Android"',
                            },
                        };
                        validate = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, config_1.validateSchema)(config)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); };
                        return [4 /*yield*/, expect(validate()).resolves.toEqual(config)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('accepts an ios config that has workspace/scheme but not a buildCommand', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, validate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            ios: {
                                workspace: 'ios/RNDemo.xcworkspace',
                                scheme: 'Test',
                                device: 'iPhone Simulator',
                            },
                        };
                        validate = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, config_1.validateSchema)(config)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); };
                        return [4 /*yield*/, expect(validate()).resolves.toEqual(config)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('accepts an ios config that has buildCommand but not workspace/scheme', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, validate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            ios: {
                                workspace: 'ios/RNDemo.xcworkspace',
                                scheme: 'Test',
                                device: 'iPhone Simulator',
                            },
                        };
                        validate = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, config_1.validateSchema)(config)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); };
                        return [4 /*yield*/, expect(validate()).resolves.toEqual(config)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('accepts a target for iOS', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        config = {
                            ios: {
                                workspace: 'ios/RNDemo.xcworkspace',
                                scheme: 'Test',
                                configuration: 'Release',
                                device: 'iPhone Simulator',
                            },
                        };
                        return [4 /*yield*/, (0, config_1.validateSchema)(config)];
                    case 1:
                        result = _b.sent();
                        expect((_a = result === null || result === void 0 ? void 0 : result.ios) === null || _a === void 0 ? void 0 : _a.configuration).toEqual('Release');
                        return [2 /*return*/];
                }
            });
        }); });
        it('defaults the target to Debug for iOS', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        config = {
                            ios: {
                                workspace: 'ios/RNDemo.xcworkspace',
                                scheme: 'Test',
                                device: 'iPhone Simulator',
                            },
                        };
                        return [4 /*yield*/, (0, config_1.validateSchema)(config)];
                    case 1:
                        result = _b.sent();
                        expect((_a = result === null || result === void 0 ? void 0 : result.ios) === null || _a === void 0 ? void 0 : _a.configuration).toEqual('Debug');
                        return [2 /*return*/];
                }
            });
        }); });
        it("rejects an ios config that doesn't have either workspace/scheme or buildCommand", function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, validate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = { ios: {} };
                        validate = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, config_1.validateSchema)(config)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); };
                        return [4 /*yield*/, expect(validate()).rejects.toContain("should have required property 'workspace'")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(validate()).rejects.toContain("should have required property 'buildCommand'")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, expect(validate()).rejects.toContain('should match some schema in anyOf')];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('rejects an ios config that has a workspace but not a scheme', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, validate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            ios: {
                                workspace: 'ios/RNDemo.xcworkspace',
                                device: 'iPhone Simulator',
                            },
                        };
                        validate = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, config_1.validateSchema)(config)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); };
                        return [4 /*yield*/, expect(validate()).rejects.toContain("should have required property 'scheme'")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(validate()).rejects.toContain('should match some schema in anyOf')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('rejects an ios config that has a build command but not a binary path', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, validate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            ios: {
                                buildCommand: 'echo "Hello iOS"',
                                device: 'iPhone Simulator',
                            },
                        };
                        validate = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, config_1.validateSchema)(config)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); };
                        return [4 /*yield*/, expect(validate()).rejects.toContain("should have required property 'binaryPath'")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(validate()).rejects.toContain('should match some schema in anyOf')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('rejects a config that does not have either ios or android options', function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, validate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {};
                        validate = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, config_1.validateSchema)(config)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); };
                        return [4 /*yield*/, expect(validate()).rejects.toContain("should have required property 'ios'")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(validate()).rejects.toContain("should have required property 'android'")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('readConfigFile', function () {
        it('reads a config file and returns JSON', function () { return __awaiter(void 0, void 0, void 0, function () {
            var buffer, filePath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buffer = Buffer.from(JSON.stringify({ hello: 'world' }), 'utf8');
                        jest.spyOn(fs_1.promises, 'readFile').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, buffer];
                        }); }); });
                        filePath = './my-config.json';
                        return [4 /*yield*/, (0, config_1.readConfigFile)(filePath)];
                    case 1:
                        result = _a.sent();
                        expect(result.hello).toBe('world');
                        return [2 /*return*/];
                }
            });
        }); });
        it('reads a config file - invalid file', function () { return __awaiter(void 0, void 0, void 0, function () {
            var filePath, call;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = './my-config.json';
                        call = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, config_1.readConfigFile)(filePath)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); };
                        return [4 /*yield*/, expect(call()).rejects.toThrow("Could not load the config at " + filePath + ". For an example see https://formidable.com/open-source/react-native-owl/docs/introduction/config-file/")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getConfig', function () {
        it('returns a validated config', function () { return __awaiter(void 0, void 0, void 0, function () {
            var expectedConfig, filePath, buffer, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedConfig = {
                            ios: {
                                workspace: 'ios/RNDemo.xcworkspace',
                                scheme: 'RNDemo',
                                configuration: 'Debug',
                                device: 'iPhone Simulator',
                            },
                            android: {
                                packageName: 'com.rndemo',
                                buildType: 'Debug',
                            },
                            debug: false,
                            report: true,
                        };
                        filePath = './owl.config.json';
                        buffer = Buffer.from(JSON.stringify(expectedConfig), 'utf8');
                        jest.spyOn(fs_1.promises, 'readFile').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, buffer];
                        }); }); });
                        return [4 /*yield*/, (0, config_1.getConfig)(filePath)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(expectedConfig);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
