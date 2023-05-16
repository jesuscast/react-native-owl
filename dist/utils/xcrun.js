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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xcrunRestore = exports.xcrunUi = exports.xcrunLaunch = exports.xcrunTerminate = exports.xcrunInstall = exports.xcrunStatusBar = void 0;
var path_1 = __importDefault(require("path"));
var execa_1 = __importDefault(require("execa"));
var wait_for_1 = require("./wait-for");
var xcrunStatusBar = function (_a) {
    var debug = _a.debug, binaryPath = _a.binaryPath, device = _a.device, _b = _a.configuration, configuration = _b === void 0 ? 'Debug' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var stdio, DEFAULT_BINARY_DIR, cwd, simulator, SIMULATOR_TIME, command;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    stdio = debug ? 'inherit' : 'ignore';
                    DEFAULT_BINARY_DIR = "/ios/build/Build/Products/" + configuration + "-iphonesimulator";
                    cwd = binaryPath
                        ? path_1.default.dirname(binaryPath)
                        : path_1.default.join(process.cwd(), DEFAULT_BINARY_DIR);
                    simulator = device.replace(/([ /])/g, '\\$1');
                    SIMULATOR_TIME = '9:41';
                    command = "xcrun simctl status_bar " + simulator + " override --time " + SIMULATOR_TIME;
                    return [4 /*yield*/, execa_1.default.command(command, { stdio: stdio, cwd: cwd })];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.xcrunStatusBar = xcrunStatusBar;
var xcrunInstall = function (_a) {
    var debug = _a.debug, binaryPath = _a.binaryPath, device = _a.device, scheme = _a.scheme, _b = _a.configuration, configuration = _b === void 0 ? 'Debug' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var stdio, DEFAULT_BINARY_DIR, cwd, appFilename, simulator, command;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    stdio = debug ? 'inherit' : 'ignore';
                    DEFAULT_BINARY_DIR = "/ios/build/Build/Products/" + configuration + "-iphonesimulator";
                    cwd = binaryPath
                        ? path_1.default.dirname(binaryPath)
                        : path_1.default.join(process.cwd(), DEFAULT_BINARY_DIR);
                    appFilename = binaryPath ? path_1.default.basename(binaryPath) : scheme + ".app";
                    simulator = device.replace(/([ /])/g, '\\$1');
                    command = "xcrun simctl install " + simulator + " " + appFilename;
                    return [4 /*yield*/, execa_1.default.command(command, { stdio: stdio, cwd: cwd })];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.xcrunInstall = xcrunInstall;
var xcrunTerminate = function (_a) {
    var debug = _a.debug, binaryPath = _a.binaryPath, device = _a.device, scheme = _a.scheme, _b = _a.configuration, configuration = _b === void 0 ? 'Debug' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var stdio, DEFAULT_BINARY_DIR, cwd, appFilename, plistPath, bundleId, simulator, command;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    stdio = debug ? 'inherit' : 'ignore';
                    DEFAULT_BINARY_DIR = "/ios/build/Build/Products/" + configuration + "-iphonesimulator";
                    cwd = binaryPath
                        ? path_1.default.dirname(binaryPath)
                        : path_1.default.join(process.cwd(), DEFAULT_BINARY_DIR);
                    appFilename = binaryPath ? path_1.default.basename(binaryPath) : scheme + ".app";
                    plistPath = path_1.default.join(cwd, appFilename, 'Info.plist');
                    return [4 /*yield*/, execa_1.default.command("./PlistBuddy -c 'Print CFBundleIdentifier' " + plistPath, { shell: true, cwd: '/usr/libexec' })];
                case 1:
                    bundleId = (_c.sent()).stdout;
                    simulator = device.replace(/([ /])/g, '\\$1');
                    command = "xcrun simctl terminate " + simulator + " " + bundleId;
                    return [4 /*yield*/, execa_1.default.command(command, { stdio: stdio, cwd: cwd })];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.xcrunTerminate = xcrunTerminate;
var xcrunLaunch = function (_a) {
    var debug = _a.debug, binaryPath = _a.binaryPath, device = _a.device, scheme = _a.scheme, _b = _a.configuration, configuration = _b === void 0 ? 'Debug' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var stdio, DEFAULT_BINARY_DIR, cwd, appFilename, plistPath, bundleId, simulator, command;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    stdio = debug ? 'inherit' : 'ignore';
                    DEFAULT_BINARY_DIR = "/ios/build/Build/Products/" + configuration + "-iphonesimulator";
                    cwd = binaryPath
                        ? path_1.default.dirname(binaryPath)
                        : path_1.default.join(process.cwd(), DEFAULT_BINARY_DIR);
                    appFilename = binaryPath ? path_1.default.basename(binaryPath) : scheme + ".app";
                    plistPath = path_1.default.join(cwd, appFilename, 'Info.plist');
                    return [4 /*yield*/, execa_1.default.command("./PlistBuddy -c 'Print CFBundleIdentifier' " + plistPath, { shell: true, cwd: '/usr/libexec' })];
                case 1:
                    bundleId = (_c.sent()).stdout;
                    simulator = device.replace(/([ /])/g, '\\$1');
                    command = "xcrun simctl launch " + simulator + " " + bundleId;
                    return [4 /*yield*/, execa_1.default.command(command, { stdio: stdio, cwd: cwd })];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.xcrunLaunch = xcrunLaunch;
var xcrunUi = function (_a) {
    var debug = _a.debug, binaryPath = _a.binaryPath, device = _a.device, _b = _a.configuration, configuration = _b === void 0 ? 'Debug' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var stdio, DEFAULT_BINARY_DIR, cwd, simulator, command;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    stdio = debug ? 'inherit' : 'ignore';
                    DEFAULT_BINARY_DIR = "/ios/build/Build/Products/" + configuration + "-iphonesimulator";
                    cwd = binaryPath
                        ? path_1.default.dirname(binaryPath)
                        : path_1.default.join(process.cwd(), DEFAULT_BINARY_DIR);
                    simulator = device.replace(/([ /])/g, '\\$1');
                    command = "xcrun simctl ui " + simulator + " appearance";
                    return [4 /*yield*/, execa_1.default.command(command + " dark", { stdio: stdio, cwd: cwd })];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, (0, wait_for_1.waitFor)(500)];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, execa_1.default.command(command + " light", { stdio: stdio, cwd: cwd })];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, (0, wait_for_1.waitFor)(500)];
                case 4:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.xcrunUi = xcrunUi;
var xcrunRestore = function (_a) {
    var debug = _a.debug, binaryPath = _a.binaryPath, device = _a.device, _b = _a.configuration, configuration = _b === void 0 ? 'Debug' : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var stdio, DEFAULT_BINARY_DIR, cwd, simulator, command;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    stdio = debug ? 'inherit' : 'ignore';
                    DEFAULT_BINARY_DIR = "/ios/build/Build/Products/" + configuration + "-iphonesimulator";
                    cwd = binaryPath
                        ? path_1.default.dirname(binaryPath)
                        : path_1.default.join(process.cwd(), DEFAULT_BINARY_DIR);
                    simulator = device.replace(/([ /])/g, '\\$1');
                    command = "xcrun simctl status_bar " + simulator + " clear";
                    return [4 /*yield*/, execa_1.default.command(command, { stdio: stdio, cwd: cwd })];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.xcrunRestore = xcrunRestore;
