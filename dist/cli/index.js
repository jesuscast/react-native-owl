#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var hideBin = require('yargs/helpers').hideBin;
var argv = (0, yargs_1.default)(hideBin(process.argv));
var build_1 = require("./build");
var run_1 = require("./run");
var plaformOption = {
    alias: 'p',
    describe: 'Platform to build and run the app',
    demandOption: true,
    choices: ['ios', 'android'],
};
var configOption = {
    alias: 'c',
    describe: 'Configuration file to be used',
    type: 'string',
    default: './owl.config.json',
};
var updateOption = {
    alias: 'u',
    describe: 'Update the baseline screenshots',
    type: 'boolean',
    default: false,
};
var builderOptionsRun = {
    config: configOption,
    platform: plaformOption,
};
var builderOptionsTest = {
    config: configOption,
    platform: plaformOption,
    update: updateOption,
};
argv
    .usage('Usage: $0 <command> [options]')
    .command({
    command: 'build',
    describe: 'Build the React Native project',
    builder: builderOptionsRun,
    handler: build_1.buildHandler,
})
    .command({
    command: 'test',
    describe: 'Runs the test suite',
    builder: builderOptionsTest,
    handler: run_1.runHandler,
})
    .help('help')
    .alias('h', 'help')
    .showHelpOnFail(false, 'Specify --help for available options')
    .alias('v', 'version').argv;
