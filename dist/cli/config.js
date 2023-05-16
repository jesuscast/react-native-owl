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
exports.getConfig = exports.readConfigFile = exports.validateSchema = void 0;
var fs_1 = require("fs");
var ajv_1 = __importDefault(require("ajv"));
var validateSchema = function (config) {
    var configSchema = {
        type: 'object',
        properties: {
            ios: {
                type: 'object',
                properties: {
                    workspace: { type: 'string', nullable: true },
                    configuration: { type: 'string', nullable: true, default: 'Debug' },
                    scheme: { type: 'string', nullable: true },
                    buildCommand: { type: 'string', nullable: true },
                    binaryPath: { type: 'string', nullable: true },
                    device: { type: 'string' },
                    quiet: { type: 'boolean', nullable: true },
                },
                required: ['device'],
                anyOf: [
                    { required: ['workspace', 'scheme'] },
                    { required: ['buildCommand', 'binaryPath'] },
                ],
                nullable: true,
                additionalProperties: false,
            },
            android: {
                type: 'object',
                properties: {
                    packageName: { type: 'string' },
                    buildCommand: { type: 'string', nullable: true },
                    buildType: { type: 'string', nullable: true, default: 'Release' },
                    binaryPath: { type: 'string', nullable: true },
                    quiet: { type: 'boolean', nullable: true },
                },
                required: ['packageName'],
                anyOf: [{ required: [] }, { required: ['buildCommand', 'binaryPath'] }],
                nullable: true,
                additionalProperties: false,
            },
            debug: { type: 'boolean', nullable: true, default: false },
            report: { type: 'boolean', nullable: true, default: true },
        },
        required: [],
        anyOf: [{ required: ['ios'] }, { required: ['android'] }],
        additionalProperties: false,
    };
    var ajv = new ajv_1.default({ useDefaults: true });
    var validate = ajv.compile(configSchema);
    return new Promise(function (resolve, reject) {
        if (validate(config)) {
            resolve(config);
        }
        else {
            var errorMessage = validate
                .errors.map(function (err) { return err.schemaPath + ": " + err.message; })
                .join(' ');
            reject(errorMessage);
        }
    });
};
exports.validateSchema = validateSchema;
var readConfigFile = function (configPath) { return __awaiter(void 0, void 0, void 0, function () {
    var configData, configString, parsedConfig, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs_1.promises.readFile(configPath, 'binary')];
            case 1:
                configData = _a.sent();
                configString = Buffer.from(configData).toString();
                parsedConfig = JSON.parse(configString);
                return [2 /*return*/, parsedConfig];
            case 2:
                err_1 = _a.sent();
                throw new Error("Could not load the config at " + configPath + ". For an example see https://formidable.com/open-source/react-native-owl/docs/introduction/config-file/");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.readConfigFile = readConfigFile;
var getConfig = function (configPath) { return __awaiter(void 0, void 0, void 0, function () {
    var config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.readConfigFile)(configPath)];
            case 1:
                config = _a.sent();
                return [4 /*yield*/, (0, exports.validateSchema)(config)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getConfig = getConfig;
