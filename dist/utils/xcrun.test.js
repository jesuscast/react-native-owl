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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var execa_1 = __importDefault(require("execa"));
var xcrun = __importStar(require("./xcrun"));
describe('xcrun.ts', function () {
    jest
        .spyOn(process, 'cwd')
        .mockReturnValue('/Users/johndoe/Projects/my-project');
    var execKillMock = {
        kill: jest.fn(),
        stdout: 'bundleId',
    };
    var execMock = jest.spyOn(execa_1.default, 'command').mockReturnValue(execKillMock);
    beforeEach(function () {
        execMock.mockClear();
    });
    describe('xcrunStatusBar', function () {
        it('updates the status bar with default config', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunStatusBar({ device: 'iPhone 13 Pro' })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('xcrun simctl status_bar iPhone\\ 13\\ Pro override --time 9:41', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Debug-iphonesimulator',
                            stdio: 'ignore',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('updates the status bar with debug', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunStatusBar({ device: 'iPhone 13 Pro', debug: true })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('xcrun simctl status_bar iPhone\\ 13\\ Pro override --time 9:41', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Debug-iphonesimulator',
                            stdio: 'inherit',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('updates the status bar with custom configuration', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunStatusBar({
                            device: 'iPhone 13 Pro',
                            configuration: 'Release',
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('xcrun simctl status_bar iPhone\\ 13\\ Pro override --time 9:41', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Release-iphonesimulator',
                            stdio: 'ignore',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('updates the status bar with custom binaryPath', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunStatusBar({
                            device: 'iPhone 13 Pro',
                            binaryPath: '/some/path/to/my/app.app',
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('xcrun simctl status_bar iPhone\\ 13\\ Pro override --time 9:41', {
                            cwd: '/some/path/to/my',
                            stdio: 'ignore',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('xcrunInstall', function () {
        it('installs the app with default config', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunInstall({ device: 'iPhone 13 Pro', scheme: 'MyApp' })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('xcrun simctl install iPhone\\ 13\\ Pro MyApp.app', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Debug-iphonesimulator',
                            stdio: 'ignore',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('installs the app with debug', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunInstall({
                            device: 'iPhone 13 Pro',
                            scheme: 'MyApp',
                            debug: true,
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('xcrun simctl install iPhone\\ 13\\ Pro MyApp.app', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Debug-iphonesimulator',
                            stdio: 'inherit',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('installs the app with custom configuration', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunInstall({
                            device: 'iPhone 13 Pro',
                            scheme: 'MyApp',
                            configuration: 'Release',
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('xcrun simctl install iPhone\\ 13\\ Pro MyApp.app', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Release-iphonesimulator',
                            stdio: 'ignore',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('installs the app with custom binaryPath', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunInstall({
                            device: 'iPhone 13 Pro',
                            configuration: 'Release',
                            binaryPath: '/some/path/to/my/app.app',
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('xcrun simctl install iPhone\\ 13\\ Pro app.app', {
                            cwd: '/some/path/to/my',
                            stdio: 'ignore',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('xcrunTerminate', function () {
        it('terminates the app with default config', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunTerminate({ device: 'iPhone 13 Pro', scheme: 'MyApp' })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(2);
                        expect(execMock).toHaveBeenNthCalledWith(1, "./PlistBuddy -c 'Print CFBundleIdentifier' /Users/johndoe/Projects/my-project/ios/build/Build/Products/Debug-iphonesimulator/MyApp.app/Info.plist", {
                            cwd: '/usr/libexec',
                            shell: true,
                        });
                        expect(execMock).toHaveBeenNthCalledWith(2, 'xcrun simctl terminate iPhone\\ 13\\ Pro bundleId', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Debug-iphonesimulator',
                            stdio: 'ignore',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('terminates the app with debug', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunTerminate({
                            device: 'iPhone 13 Pro',
                            scheme: 'MyApp',
                            debug: true,
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(2);
                        expect(execMock).toHaveBeenNthCalledWith(2, 'xcrun simctl terminate iPhone\\ 13\\ Pro bundleId', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Debug-iphonesimulator',
                            stdio: 'inherit',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('terminates the app with custom configuration', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunTerminate({
                            device: 'iPhone 13 Pro',
                            scheme: 'MyApp',
                            configuration: 'Release',
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(2);
                        expect(execMock).toHaveBeenNthCalledWith(1, "./PlistBuddy -c 'Print CFBundleIdentifier' /Users/johndoe/Projects/my-project/ios/build/Build/Products/Release-iphonesimulator/MyApp.app/Info.plist", {
                            cwd: '/usr/libexec',
                            shell: true,
                        });
                        expect(execMock).toHaveBeenNthCalledWith(2, 'xcrun simctl terminate iPhone\\ 13\\ Pro bundleId', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Release-iphonesimulator',
                            stdio: 'ignore',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('terminates the app with custom binaryPath', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunTerminate({
                            device: 'iPhone 13 Pro',
                            configuration: 'Release',
                            binaryPath: '/some/path/to/my/app.app',
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(2);
                        expect(execMock).toHaveBeenNthCalledWith(1, "./PlistBuddy -c 'Print CFBundleIdentifier' /some/path/to/my/app.app/Info.plist", {
                            cwd: '/usr/libexec',
                            shell: true,
                        });
                        expect(execMock).toHaveBeenNthCalledWith(2, 'xcrun simctl terminate iPhone\\ 13\\ Pro bundleId', {
                            cwd: '/some/path/to/my',
                            stdio: 'ignore',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('xcrunLaunch', function () {
        it('launches the app with default config', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunLaunch({ device: 'iPhone 13 Pro', scheme: 'MyApp' })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(2);
                        expect(execMock).toHaveBeenNthCalledWith(1, "./PlistBuddy -c 'Print CFBundleIdentifier' /Users/johndoe/Projects/my-project/ios/build/Build/Products/Debug-iphonesimulator/MyApp.app/Info.plist", {
                            cwd: '/usr/libexec',
                            shell: true,
                        });
                        expect(execMock).toHaveBeenNthCalledWith(2, 'xcrun simctl launch iPhone\\ 13\\ Pro bundleId', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Debug-iphonesimulator',
                            stdio: 'ignore',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('launches the app with debug', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunLaunch({
                            device: 'iPhone 13 Pro',
                            scheme: 'MyApp',
                            debug: true,
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(2);
                        expect(execMock).toHaveBeenNthCalledWith(2, 'xcrun simctl launch iPhone\\ 13\\ Pro bundleId', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Debug-iphonesimulator',
                            stdio: 'inherit',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('launches the app with custom configuration', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunLaunch({
                            device: 'iPhone 13 Pro',
                            scheme: 'MyApp',
                            configuration: 'Release',
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(2);
                        expect(execMock).toHaveBeenNthCalledWith(1, "./PlistBuddy -c 'Print CFBundleIdentifier' /Users/johndoe/Projects/my-project/ios/build/Build/Products/Release-iphonesimulator/MyApp.app/Info.plist", {
                            cwd: '/usr/libexec',
                            shell: true,
                        });
                        expect(execMock).toHaveBeenNthCalledWith(2, 'xcrun simctl launch iPhone\\ 13\\ Pro bundleId', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Release-iphonesimulator',
                            stdio: 'ignore',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('launches the app with custom binaryPath', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunLaunch({
                            device: 'iPhone 13 Pro',
                            configuration: 'Release',
                            binaryPath: '/some/path/to/my/app.app',
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(2);
                        expect(execMock).toHaveBeenNthCalledWith(1, "./PlistBuddy -c 'Print CFBundleIdentifier' /some/path/to/my/app.app/Info.plist", {
                            cwd: '/usr/libexec',
                            shell: true,
                        });
                        expect(execMock).toHaveBeenNthCalledWith(2, 'xcrun simctl launch iPhone\\ 13\\ Pro bundleId', {
                            cwd: '/some/path/to/my',
                            stdio: 'ignore',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('xcrunUi', function () {
        it('sets the simulator UI with default config', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunUi({ device: 'iPhone 13 Pro' })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(2);
                        expect(execMock).toHaveBeenNthCalledWith(1, 'xcrun simctl ui iPhone\\ 13\\ Pro appearance dark', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Debug-iphonesimulator',
                            stdio: 'ignore',
                        });
                        expect(execMock).toHaveBeenNthCalledWith(2, 'xcrun simctl ui iPhone\\ 13\\ Pro appearance light', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Debug-iphonesimulator',
                            stdio: 'ignore',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('sets the simulator UI with debug', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunUi({
                            device: 'iPhone 13 Pro',
                            debug: true,
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(2);
                        expect(execMock).toHaveBeenNthCalledWith(1, 'xcrun simctl ui iPhone\\ 13\\ Pro appearance dark', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Debug-iphonesimulator',
                            stdio: 'inherit',
                        });
                        expect(execMock).toHaveBeenNthCalledWith(2, 'xcrun simctl ui iPhone\\ 13\\ Pro appearance light', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Debug-iphonesimulator',
                            stdio: 'inherit',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('sets the simulator UI with custom configuration', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunUi({
                            device: 'iPhone 13 Pro',
                            configuration: 'Release',
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(2);
                        expect(execMock).toHaveBeenNthCalledWith(1, 'xcrun simctl ui iPhone\\ 13\\ Pro appearance dark', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Release-iphonesimulator',
                            stdio: 'ignore',
                        });
                        expect(execMock).toHaveBeenNthCalledWith(2, 'xcrun simctl ui iPhone\\ 13\\ Pro appearance light', {
                            cwd: '/Users/johndoe/Projects/my-project/ios/build/Build/Products/Release-iphonesimulator',
                            stdio: 'ignore',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('sets the simulator UI with custom binaryPath', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, xcrun.xcrunUi({
                            device: 'iPhone 13 Pro',
                            configuration: 'Release',
                            binaryPath: '/some/path/to/my/app.app',
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(2);
                        expect(execMock).toHaveBeenNthCalledWith(1, 'xcrun simctl ui iPhone\\ 13\\ Pro appearance dark', {
                            cwd: '/some/path/to/my',
                            stdio: 'ignore',
                        });
                        expect(execMock).toHaveBeenNthCalledWith(2, 'xcrun simctl ui iPhone\\ 13\\ Pro appearance light', {
                            cwd: '/some/path/to/my',
                            stdio: 'ignore',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
