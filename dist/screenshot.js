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
exports.takeScreenshot = exports.cleanupScreenshots = void 0;
var execa_1 = __importDefault(require("execa"));
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var file_exists_1 = require("./utils/file-exists");
var logger_1 = require("./logger");
var cleanupScreenshots = function () { return __awaiter(void 0, void 0, void 0, function () {
    var latestDirPath, diffDirPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                latestDirPath = path_1.default.join(process.cwd(), '.owl', 'latest');
                return [4 /*yield*/, fs_1.promises.rm(latestDirPath, { recursive: true, force: true })];
            case 1:
                _a.sent();
                diffDirPath = path_1.default.join(process.cwd(), '.owl', 'diff');
                return [4 /*yield*/, fs_1.promises.rm(diffDirPath, { recursive: true, force: true })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.cleanupScreenshots = cleanupScreenshots;
/**
 * Takes a screenshot from the simulator.
 * @param filename - Required. The filename(excluding the extension) that will be used to save the screenshot. ie. 'homepage'
 * @returns the path to the screenshot.
 */
var takeScreenshot = function (filename) { return __awaiter(void 0, void 0, void 0, function () {
    var platform, iosDevice, iosSimulator, debug, updateBaseline, screenshotFilename, stdio, logger, screenshotsDirPath, gitignoreExist, baselineExist, DIR_NAME, cwd, screenshotCommand, screenshotPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                platform = process.env.OWL_PLATFORM;
                iosDevice = process.env.OWL_IOS_SIMULATOR;
                iosSimulator = iosDevice === null || iosDevice === void 0 ? void 0 : iosDevice.replace(/([ /])/g, '\\$1');
                debug = process.env.OWL_DEBUG === 'true';
                updateBaseline = process.env.OWL_UPDATE_BASELINE === 'true';
                screenshotFilename = filename + ".png";
                stdio = debug ? 'inherit' : 'ignore';
                logger = new logger_1.Logger(!!debug);
                screenshotsDirPath = path_1.default.join(process.cwd(), '.owl');
                return [4 /*yield*/, fs_1.promises.mkdir(screenshotsDirPath, { recursive: true })];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, file_exists_1.fileExists)(path_1.default.join(screenshotsDirPath, '.gitignore'))];
            case 2:
                gitignoreExist = _a.sent();
                if (!!gitignoreExist) return [3 /*break*/, 4];
                return [4 /*yield*/, fs_1.promises.writeFile(path_1.default.join(process.cwd(), '.owl', '.gitignore'), '# generated by react-native-owl\ndiff/\nlatest/\nreport/\n')];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, (0, file_exists_1.fileExists)(path_1.default.join(screenshotsDirPath, 'baseline', platform, screenshotFilename))];
            case 5:
                baselineExist = _a.sent();
                DIR_NAME = updateBaseline || !baselineExist ? 'baseline' : 'latest';
                cwd = path_1.default.join(screenshotsDirPath, DIR_NAME, platform);
                return [4 /*yield*/, fs_1.promises.mkdir(cwd, { recursive: true })];
            case 6:
                _a.sent();
                screenshotCommand = platform === 'ios'
                    ? "xcrun simctl io " + iosSimulator + " screenshot " + screenshotFilename
                    : "adb exec-out screencap -p > " + screenshotFilename;
                logger.info("[OWL - CLI] Will run the screenshot command: " + screenshotCommand + ".");
                return [4 /*yield*/, execa_1.default.command(screenshotCommand, {
                        stdio: stdio,
                        cwd: cwd,
                        shell: platform === 'android',
                    })];
            case 7:
                _a.sent();
                if (!baselineExist) {
                    logger.print("[OWL - CLI] " + screenshotFilename + " baseline screenshot created.");
                }
                screenshotPath = cwd + "/" + screenshotFilename;
                logger.info("[OWL - CLI] Screenshot saved to " + screenshotPath + ".");
                return [2 /*return*/, screenshotPath];
        }
    });
}); };
exports.takeScreenshot = takeScreenshot;
