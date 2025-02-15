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
var adb = __importStar(require("./adb"));
describe('adb.ts', function () {
    jest
        .spyOn(process, 'cwd')
        .mockReturnValue('/Users/johndoe/Projects/my-project');
    var execKillMock = {
        kill: jest.fn(),
    };
    var execMock = jest.spyOn(execa_1.default, 'command').mockReturnValue(execKillMock);
    beforeEach(function () {
        execMock.mockReset();
    });
    describe('adbInstall', function () {
        it('installs an app with default config', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adb.adbInstall({})];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('adb install -r /Users/johndoe/Projects/my-project/android/app/build/outputs/apk/release/app-release.apk', { stdio: 'ignore' });
                        return [2 /*return*/];
                }
            });
        }); });
        it('installs an app with debugging', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adb.adbInstall({ debug: true })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('adb install -r /Users/johndoe/Projects/my-project/android/app/build/outputs/apk/release/app-release.apk', { stdio: 'inherit' });
                        return [2 /*return*/];
                }
            });
        }); });
        it('installs an app with custom buildType', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adb.adbInstall({
                            buildType: 'Debug',
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('adb install -r /Users/johndoe/Projects/my-project/android/app/build/outputs/apk/debug/app-debug.apk', { stdio: 'ignore' });
                        return [2 /*return*/];
                }
            });
        }); });
        it('installs an app with custom binaryPath', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adb.adbInstall({
                            binaryPath: '/custom/path/app.apk',
                        })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('adb install -r /custom/path/app.apk', { stdio: 'ignore' });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('adbTerminate', function () {
        it('terminates an app', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adb.adbTerminate({ packageName: 'com.name.app' })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('adb shell am force-stop com.name.app', { stdio: 'ignore' });
                        return [2 /*return*/];
                }
            });
        }); });
        it('terminates an app with debugging', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adb.adbTerminate({ debug: true, packageName: 'com.name.app' })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('adb shell am force-stop com.name.app', { stdio: 'inherit' });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('adbLaunch', function () {
        it('launches an app', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adb.adbLaunch({ packageName: 'com.name.app' })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('adb shell monkey -p "com.name.app" -c android.intent.category.LAUNCHER 1', { stdio: 'ignore' });
                        return [2 /*return*/];
                }
            });
        }); });
        it('launches an app with debugging', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, adb.adbLaunch({ debug: true, packageName: 'com.name.app' })];
                    case 1:
                        _a.sent();
                        expect(execMock).toHaveBeenCalledTimes(1);
                        expect(execMock).toHaveBeenCalledWith('adb shell monkey -p "com.name.app" -c android.intent.category.LAUNCHER 1', { stdio: 'inherit' });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
