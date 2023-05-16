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
exports.buildHandler = exports.buildAndroid = exports.buildIOS = exports.ENTRY_FILE = void 0;
var path_1 = __importDefault(require("path"));
var execa_1 = __importDefault(require("execa"));
var logger_1 = require("../logger");
var config_1 = require("./config");
exports.ENTRY_FILE = './node_modules/react-native-owl/dist/client/index.app.js';
var buildIOS = function (config, logger) { return __awaiter(void 0, void 0, void 0, function () {
    var buildCommand;
    var _a, _b, _c, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                buildCommand = ((_a = config.ios) === null || _a === void 0 ? void 0 : _a.buildCommand)
                    ? [(_b = config.ios) === null || _b === void 0 ? void 0 : _b.buildCommand]
                    : [
                        "xcodebuild",
                        "-workspace " + ((_c = config.ios) === null || _c === void 0 ? void 0 : _c.workspace),
                        "-scheme " + ((_d = config.ios) === null || _d === void 0 ? void 0 : _d.scheme),
                        "-configuration " + ((_e = config.ios) === null || _e === void 0 ? void 0 : _e.configuration),
                        "-sdk iphonesimulator",
                        "-derivedDataPath ios/build",
                    ];
                if (!((_f = config.ios) === null || _f === void 0 ? void 0 : _f.buildCommand) && ((_g = config.ios) === null || _g === void 0 ? void 0 : _g.quiet)) {
                    buildCommand.push('-quiet');
                }
                logger.info("[OWL - CLI] Building the app with: " + buildCommand.join(' ') + ".");
                return [4 /*yield*/, execa_1.default.command(buildCommand.join(' '), {
                        stdio: 'inherit',
                        env: {
                            ENTRY_FILE: exports.ENTRY_FILE,
                        },
                    })];
            case 1:
                _h.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.buildIOS = buildIOS;
var buildAndroid = function (config, logger) { return __awaiter(void 0, void 0, void 0, function () {
    var buildCommand, cwd;
    var _a, _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                buildCommand = ((_a = config.android) === null || _a === void 0 ? void 0 : _a.buildCommand)
                    ? [(_b = config.android) === null || _b === void 0 ? void 0 : _b.buildCommand]
                    : [
                        "./gradlew",
                        ((_c = config.android) === null || _c === void 0 ? void 0 : _c.buildType) === 'Debug'
                            ? "assembleDebug"
                            : 'assembleRelease',
                        '--console plain',
                    ];
                if (!((_d = config.android) === null || _d === void 0 ? void 0 : _d.buildCommand) && ((_e = config.android) === null || _e === void 0 ? void 0 : _e.quiet)) {
                    buildCommand.push('--quiet');
                }
                // Add a project environmental to tell build.gradle to use a specific Android Manifest that allows WebSocket usage.
                // (https://docs.gradle.org/current/userguide/command_line_interface.html#sec:environment_options)
                buildCommand.push('-PisOwlBuild=true');
                cwd = ((_f = config.android) === null || _f === void 0 ? void 0 : _f.buildCommand)
                    ? undefined
                    : path_1.default.join(process.cwd(), 'android');
                logger.info("[OWL - CLI] Building the app with: " + buildCommand.join(' ') + ".");
                return [4 /*yield*/, execa_1.default.command(buildCommand.join(' '), {
                        stdio: 'inherit',
                        cwd: cwd,
                        env: {
                            ENTRY_FILE: exports.ENTRY_FILE,
                        },
                    })];
            case 1:
                _g.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.buildAndroid = buildAndroid;
var buildHandler = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var config, logger, buildProject;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, config_1.getConfig)(args.config)];
            case 1:
                config = _a.sent();
                logger = new logger_1.Logger(config.debug);
                buildProject = args.platform === 'ios' ? exports.buildIOS : exports.buildAndroid;
                logger.print("[OWL - CLI] Building the app on " + args.platform + " platform.");
                logger.info("[OWL - CLI] Using the config file " + args.config + ".");
                return [4 /*yield*/, buildProject(config, logger)];
            case 2:
                _a.sent();
                logger.info("[OWL - CLI] Successfully built for the " + args.platform + " platform.");
                return [2 /*return*/];
        }
    });
}); };
exports.buildHandler = buildHandler;
