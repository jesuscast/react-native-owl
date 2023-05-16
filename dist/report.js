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
exports.generateReport = exports.cleanupReport = void 0;
var path_1 = __importDefault(require("path"));
var handlebars_1 = __importDefault(require("handlebars"));
var fs_1 = require("fs");
var file_exists_1 = require("./utils/file-exists");
var cleanupReport = function () { return __awaiter(void 0, void 0, void 0, function () {
    var cwd, reportDirPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cwd = process.cwd();
                reportDirPath = path_1.default.join(cwd, '.owl', 'report');
                return [4 /*yield*/, fs_1.promises.rm(reportDirPath, { recursive: true, force: true })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.cleanupReport = cleanupReport;
var generateReport = function (logger, platform) { return __awaiter(void 0, void 0, void 0, function () {
    var cwd, reportDirPath, jestOutputFilepath, jestOutputText, jestOutput, diffScreenshotsDirPath, baselineScreenshotsDirPath, baselineScreenshotsDirExists, baselineScreenshots, failingScreenshots, _a, passingScreenshots, duration, durationFormatted, stats, reportFilename, entryFile, htmlTemplate, templateScript, htmlContent, reportFilePath;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                cwd = process.cwd();
                reportDirPath = path_1.default.join(cwd, '.owl', 'report');
                jestOutputFilepath = path_1.default.join(reportDirPath, 'jest-report.json');
                return [4 /*yield*/, fs_1.promises.readFile(jestOutputFilepath, 'utf8')];
            case 1:
                jestOutputText = _b.sent();
                jestOutput = JSON.parse(jestOutputText);
                diffScreenshotsDirPath = path_1.default.join(cwd, '.owl', 'diff', platform);
                baselineScreenshotsDirPath = path_1.default.join(cwd, '.owl', 'baseline', platform);
                return [4 /*yield*/, (0, file_exists_1.fileExists)(baselineScreenshotsDirPath)];
            case 2:
                baselineScreenshotsDirExists = _b.sent();
                if (!baselineScreenshotsDirExists) {
                    logger.print("[OWL - CLI] Generating report skipped as is no baseline screenshots directory");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fs_1.promises.readdir(baselineScreenshotsDirPath)];
            case 3:
                baselineScreenshots = _b.sent();
                return [4 /*yield*/, (0, file_exists_1.fileExists)(diffScreenshotsDirPath)];
            case 4:
                if (!(_b.sent())) return [3 /*break*/, 6];
                return [4 /*yield*/, fs_1.promises.readdir(diffScreenshotsDirPath)];
            case 5:
                _a = _b.sent();
                return [3 /*break*/, 7];
            case 6:
                _a = [];
                _b.label = 7;
            case 7:
                failingScreenshots = _a;
                passingScreenshots = baselineScreenshots.filter(function (screenshot) { return !failingScreenshots.includes(screenshot); });
                duration = (Date.now() - jestOutput.startTime) / 1000;
                durationFormatted = parseFloat("" + duration).toFixed(2);
                stats = {
                    totalTestSuites: jestOutput.numTotalTestSuites,
                    totalTests: jestOutput.numTotalTests,
                    failedTestSuites: jestOutput.numFailedTestSuites,
                    failedTests: jestOutput.numFailedTests,
                    passedTestSuites: jestOutput.numPassedTestSuites,
                    passedTests: jestOutput.numPassedTests,
                    duration: durationFormatted,
                    success: jestOutput.success,
                };
                logger.info("[OWL - CLI] Generating Report");
                reportFilename = 'index.html';
                entryFile = path_1.default.join(__dirname, 'report', reportFilename);
                return [4 /*yield*/, fs_1.promises.readFile(entryFile, 'utf-8')];
            case 8:
                htmlTemplate = _b.sent();
                templateScript = handlebars_1.default.compile(htmlTemplate);
                htmlContent = templateScript({
                    currentYear: new Date().getFullYear(),
                    currentDateTime: new Date().toUTCString(),
                    platform: platform,
                    failingScreenshots: failingScreenshots,
                    passingScreenshots: passingScreenshots,
                    stats: stats,
                });
                return [4 /*yield*/, fs_1.promises.mkdir(reportDirPath, { recursive: true })];
            case 9:
                _b.sent();
                reportFilePath = path_1.default.join(reportDirPath, 'index.html');
                return [4 /*yield*/, fs_1.promises.writeFile(reportFilePath, htmlContent)];
            case 10:
                _b.sent();
                logger.print("[OWL - CLI] Report was built at " + reportDirPath + "/" + reportFilename);
                return [2 /*return*/];
        }
    });
}); };
exports.generateReport = generateReport;
