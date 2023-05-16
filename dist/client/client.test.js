"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
describe('client.ts', function () {
    jest.mock('react-native', function () { return ({
        Platform: {
            OS: 'android',
        },
    }); });
    afterEach(function () {
        jest.restoreAllMocks();
    });
    var client = require('./client');
    it('inits the client', function () {
        var patchReact = jest.fn();
        var waitForWebSocket = jest.fn();
        jest.spyOn(client, 'patchReact').mockImplementation(patchReact);
        jest.spyOn(client, 'waitForWebSocket').mockImplementation(waitForWebSocket);
        client.initClient();
        expect(patchReact).toHaveBeenCalled();
        expect(waitForWebSocket).toHaveBeenCalled();
    });
    it('patches react', function () {
        var createElement = jest
            .spyOn(react_1.default, 'createElement')
            .mockImplementation();
        var applyElementTracking = jest.fn();
        jest
            .spyOn(client, 'applyElementTracking')
            .mockImplementation(applyElementTracking);
        client.patchReact();
        var props = { testID: 'testID' };
        react_1.default.createElement('View', props);
        expect(createElement).toHaveBeenCalledTimes(1);
        expect(applyElementTracking).toHaveBeenCalledWith(props);
    });
    describe('applyElementTracking', function () {
        var add = jest.fn();
        beforeEach(function () {
            var trackedElements = require('./trackedElements');
            add.mockReset();
            jest.spyOn(trackedElements, 'add').mockImplementation(add);
        });
        it('tracks elements with a testID', function () {
            var newProps = client.applyElementTracking({
                testID: 'testID',
                foo: 'bar',
            });
            expect(add).toHaveBeenCalledTimes(1);
            expect(newProps).toEqual({
                testID: 'testID',
                foo: 'bar',
                ref: { current: null },
                showsHorizontalScrollIndicator: false,
                showsVerticalScrollIndicator: false,
            });
        });
        it('does not track elements without a testID', function () {
            var newProps = client.applyElementTracking({
                testID: undefined,
                foo: 'bar',
            });
            expect(add).toHaveBeenCalledTimes(0);
            expect(newProps).toEqual({
                foo: 'bar',
                showsHorizontalScrollIndicator: false,
                showsVerticalScrollIndicator: false,
            });
        });
    });
});
