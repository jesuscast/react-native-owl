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
exports.runHandler = exports.runAndroid = exports.restoreIOSUI = exports.runIOS = void 0;
var path_1 = __importDefault(require("path"));
var execa_1 = __importDefault(require("execa"));
var fs_1 = require("fs");
var screenshot_1 = require("../screenshot");
var report_1 = require("../report");
var config_1 = require("./config");
var logger_1 = require("../logger");
var wait_for_1 = require("../utils/wait-for");
var adb_1 = require("../utils/adb");
var xcrun_1 = require("../utils/xcrun");
var runIOS = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!config.ios) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, xcrun_1.xcrunStatusBar)({
                        debug: config.debug,
                        device: config.ios.device,
                        configuration: config.ios.configuration,
                        binaryPath: config.ios.binaryPath,
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, xcrun_1.xcrunInstall)({
                        debug: config.debug,
                        device: config.ios.device,
                        configuration: config.ios.configuration,
                        binaryPath: config.ios.binaryPath,
                        scheme: config.ios.scheme,
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, xcrun_1.xcrunLaunch)({
                        debug: config.debug,
                        device: config.ios.device,
                        configuration: config.ios.configuration,
                        binaryPath: config.ios.binaryPath,
                        scheme: config.ios.scheme,
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, wait_for_1.waitFor)(1000)];
            case 4:
                _a.sent();
                // Workaround to force the virtual home button's color to become consistent
                return [4 /*yield*/, (0, xcrun_1.xcrunUi)({
                        debug: config.debug,
                        device: config.ios.device,
                        configuration: config.ios.configuration,
                        binaryPath: config.ios.binaryPath,
                    })];
            case 5:
                // Workaround to force the virtual home button's color to become consistent
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.runIOS = runIOS;
var restoreIOSUI = function (config, logger) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!config.ios) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, xcrun_1.xcrunRestore)({
                        debug: config.debug,
                        device: config.ios.device,
                        configuration: config.ios.configuration,
                        binaryPath: config.ios.binaryPath,
                    })];
            case 1:
                _a.sent();
                logger.print("[OWL - CLI] Restored status bar time");
                return [2 /*return*/];
        }
    });
}); };
exports.restoreIOSUI = restoreIOSUI;
var runAndroid = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!config.android) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, adb_1.adbInstall)({
                        debug: config.debug,
                        buildType: config.android.buildType,
                        binaryPath: config.android.binaryPath,
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, adb_1.adbLaunch)({
                        debug: config.debug,
                        packageName: config.android.packageName,
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, wait_for_1.waitFor)(500)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.runAndroid = runAndroid;
var runHandler = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var cwd, config, logger, runProject, restoreSimulatorUI, webSocketProcess, jestConfigPath, jestCommandArgs, reportDirPath, outputFile, jestCommand, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                cwd = process.cwd();
                return [4 /*yield*/, (0, config_1.getConfig)(args.config)];
            case 1:
                config = _b.sent();
                logger = new logger_1.Logger(config.debug);
                runProject = args.platform === 'ios' ? exports.runIOS : exports.runAndroid;
                restoreSimulatorUI = args.platform === 'ios' && exports.restoreIOSUI;
                // Remove old report and screenshots
                return [4 /*yield*/, (0, report_1.cleanupReport)()];
            case 2:
                // Remove old report and screenshots
                _b.sent();
                return [4 /*yield*/, (0, screenshot_1.cleanupScreenshots)()];
            case 3:
                _b.sent();
                logger.print("[OWL - CLI] Starting websocket server.");
                webSocketProcess = execa_1.default.command('node scripts/websocket-server.js', {
                    stdio: 'inherit',
                    cwd: path_1.default.join(__dirname, '..', '..'),
                    env: {
                        OWL_DEBUG: String(!!config.debug),
                    },
                });
                logger.print("[OWL - CLI] Running tests on " + args.platform + ".");
                return [4 /*yield*/, runProject(config)];
            case 4:
                _b.sent();
                jestConfigPath = path_1.default.join(__dirname, '..', 'jest-config.json');
                jestCommandArgs = [
                    'jest',
                    "--config=" + jestConfigPath,
                    "--roots=" + cwd,
                    '--runInBand',
                    "--globals='" + JSON.stringify({ OWL_CLI_ARGS: args }) + "'",
                ];
                if (!config.report) return [3 /*break*/, 6];
                reportDirPath = path_1.default.join(cwd, '.owl', 'report');
                outputFile = path_1.default.join(reportDirPath, 'jest-report.json');
                return [4 /*yield*/, fs_1.promises.mkdir(reportDirPath, { recursive: true })];
            case 5:
                _b.sent();
                jestCommandArgs.push("--json --outputFile=" + outputFile);
                _b.label = 6;
            case 6:
                jestCommand = jestCommandArgs.join(' ');
                logger.print("[OWL - CLI] " + (args.update
                    ? '(Update mode) Updating baseline images'
                    : '(Tests mode) Will compare latest images with the baseline') + ".");
                logger.info("[OWL - CLI] Will use the jest config localed at " + jestConfigPath + ".");
                logger.info("[OWL - CLI] Will set the jest root to " + process.cwd() + ".");
                _b.label = 7;
            case 7:
                _b.trys.push([7, 9, 10, 15]);
                return [4 /*yield*/, execa_1.default.commandSync(jestCommand, {
                        stdio: 'inherit',
                        env: {
                            OWL_PLATFORM: args.platform,
                            OWL_DEBUG: String(!!config.debug),
                            OWL_UPDATE_BASELINE: String(!!args.update),
                            OWL_IOS_SIMULATOR: (_a = config.ios) === null || _a === void 0 ? void 0 : _a.device,
                        },
                    })];
            case 8:
                _b.sent();
                return [3 /*break*/, 15];
            case 9:
                error_1 = _b.sent();
                // Throw the error again, so that ci will fail when the jest tests fail
                throw error_1;
            case 10:
                if (!config.report) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, report_1.generateReport)(logger, args.platform)];
            case 11:
                _b.sent();
                _b.label = 12;
            case 12:
                webSocketProcess.kill();
                if (!restoreSimulatorUI) return [3 /*break*/, 14];
                return [4 /*yield*/, restoreSimulatorUI(config, logger)];
            case 13:
                _b.sent();
                _b.label = 14;
            case 14:
                logger.print("[OWL - CLI] Tests completed on " + args.platform + ".");
                if (args.update) {
                    logger.print("[OWL - CLI] All baseline images for " + args.platform + " have been updated successfully.");
                }
                return [7 /*endfinally*/];
            case 15: return [2 /*return*/];
        }
    });
}); };
exports.runHandler = runHandler;
