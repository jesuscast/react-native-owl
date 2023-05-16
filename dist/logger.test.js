"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
describe('logger.ts', function () {
    var logMessage = 'Hello World';
    var logInfoMock = jest.spyOn(global.console, 'info');
    var logWarnMock = jest.spyOn(global.console, 'warn');
    var logErrorMock = jest.spyOn(global.console, 'error');
    var logPrintMock = jest.spyOn(global.console, 'log');
    beforeEach(function () {
        logInfoMock.mockReset();
        logWarnMock.mockReset();
        logErrorMock.mockReset();
        logPrintMock.mockReset();
    });
    describe('info', function () {
        it('should log a message', function () {
            var logger = new logger_1.Logger(true);
            logger.info(logMessage);
            expect(logInfoMock).toHaveBeenCalledWith(logMessage);
        });
        it('should not log a message when disabled', function () {
            var logger = new logger_1.Logger(false);
            logger.info(logMessage);
            expect(logInfoMock).not.toHaveBeenCalled();
        });
    });
    describe('warn', function () {
        it('should log a message', function () {
            var logger = new logger_1.Logger(true);
            logger.warn(logMessage);
            expect(logWarnMock).toHaveBeenCalledWith(logMessage);
        });
        it('should not log a message when disabled', function () {
            var logger = new logger_1.Logger(false);
            logger.warn(logMessage);
            expect(logWarnMock).not.toHaveBeenCalled();
        });
    });
    describe('error', function () {
        it('should log a message', function () {
            var logger = new logger_1.Logger(true);
            logger.error(logMessage);
            expect(logErrorMock).toHaveBeenCalledWith(logMessage);
        });
        it('should not log a message when disabled', function () {
            var logger = new logger_1.Logger(false);
            logger.error(logMessage);
            expect(logErrorMock).not.toHaveBeenCalled();
        });
    });
    describe('print', function () {
        it('should log a message', function () {
            var logger = new logger_1.Logger(true);
            logger.print(logMessage);
            expect(logPrintMock).toHaveBeenCalledWith(logMessage);
        });
        it('should still log a message when disabled', function () {
            var logger = new logger_1.Logger(false);
            logger.print(logMessage);
            expect(logPrintMock).toHaveBeenCalledWith(logMessage);
        });
    });
});
