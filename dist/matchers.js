"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMatchBaseline = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var pixelmatch_1 = __importDefault(require("pixelmatch"));
var pngjs_1 = require("pngjs");
var toMatchBaseline = function (latestPath, options) {
    if (options === void 0) { options = { threshold: 0.1, diffPixelsThreshold: 0 }; }
    var platform = process.env.OWL_PLATFORM;
    var screenshotsDir = path_1.default.join(path_1.default.dirname(latestPath), '..', '..');
    var baselinePath = path_1.default.join(screenshotsDir, 'baseline', platform, path_1.default.basename(latestPath));
    if (latestPath === baselinePath) {
        return {
            message: function () { return 'Generated a fresh baseline, skipping comparison.'; },
            pass: true,
        };
    }
    try {
        var diffPath = path_1.default.join(screenshotsDir, 'diff', platform, path_1.default.basename(latestPath));
        fs_1.default.mkdirSync(path_1.default.dirname(diffPath), { recursive: true });
        var baselineData = fs_1.default.readFileSync(baselinePath);
        var baselineImage = pngjs_1.PNG.sync.read(baselineData);
        var latestData = fs_1.default.readFileSync(latestPath);
        var latestImage = pngjs_1.PNG.sync.read(latestData);
        var diffImage = new pngjs_1.PNG({
            width: baselineImage.width,
            height: baselineImage.height,
        });
        var diffPixelsCount_1 = (0, pixelmatch_1.default)(baselineImage.data, latestImage.data, diffImage.data, baselineImage.width, baselineImage.height, { threshold: options === null || options === void 0 ? void 0 : options.threshold });
        if (((options === null || options === void 0 ? void 0 : options.diffPixelsThreshold) && diffPixelsCount_1 <= (options === null || options === void 0 ? void 0 : options.diffPixelsThreshold)) || diffPixelsCount_1 === 0) {
            return {
                message: function () {
                    return "Compared screenshot to match baseline. No differences were found.";
                },
                pass: true,
            };
        }
        // Create and save the diff image
        fs_1.default.writeFileSync(diffPath, pngjs_1.PNG.sync.write(diffImage));
        return {
            message: function () {
                return "Compared screenshot to match baseline. " + diffPixelsCount_1 + " were different.";
            },
            pass: diffPixelsCount_1 === 0,
        };
    }
    catch (error) {
        var message_1 = 'Unknown error';
        if (error instanceof Error) {
            message_1 = error.message;
        }
        return {
            message: function () { return "Screenshot diffing error - " + message_1; },
            pass: false,
        };
    }
};
exports.toMatchBaseline = toMatchBaseline;
expect.extend({ toMatchBaseline: exports.toMatchBaseline });
