"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../logger");
var handleAction_1 = require("./handleAction");
describe('handleAction.ts', function () {
    var logger = new logger_1.Logger(false);
    it('throw error on unsupported action', function () {
        var test = function () {
            return (0, handleAction_1.handleAction)(logger, 'testID', {
                ref: { current: null },
            }, 
            // @ts-ignore
            'UNSUPPORTED');
        };
        expect(test).toThrow();
    });
    describe('PRESS', function () {
        it('throw error when onPress prop is not available', function () {
            var test = function () {
                return (0, handleAction_1.handleAction)(logger, 'testID', {
                    ref: { current: null },
                }, 'PRESS');
            };
            expect(test).toThrow();
        });
        it('calls onPress function', function () {
            var onPress = jest.fn();
            (0, handleAction_1.handleAction)(logger, 'testID', {
                ref: { current: null },
                onPress: onPress,
            }, 'PRESS');
            expect(onPress).toHaveBeenCalled();
        });
    });
    describe('LONG_PRESS', function () {
        it('throw error when onLongPress prop is not available', function () {
            var test = function () {
                return (0, handleAction_1.handleAction)(logger, 'testID', {
                    ref: { current: null },
                }, 'LONG_PRESS');
            };
            expect(test).toThrow();
        });
        it('calls onLongPress function', function () {
            var onLongPress = jest.fn();
            (0, handleAction_1.handleAction)(logger, 'testID', {
                ref: { current: null },
                onLongPress: onLongPress,
            }, 'LONG_PRESS');
            expect(onLongPress).toHaveBeenCalled();
        });
    });
    describe('CHANGE_TEXT', function () {
        it('throw error when onChangeText prop is not available', function () {
            var test = function () {
                return (0, handleAction_1.handleAction)(logger, 'testID', {
                    ref: { current: null },
                }, 'CHANGE_TEXT');
            };
            expect(test).toThrow();
        });
        it('calls onLongPress function', function () {
            var onChangeText = jest.fn();
            (0, handleAction_1.handleAction)(logger, 'testID', {
                ref: { current: null },
                onChangeText: onChangeText,
            }, 'CHANGE_TEXT');
            expect(onChangeText).toHaveBeenCalledWith('');
        });
        it('calls onLongPress function with value', function () {
            var onChangeText = jest.fn();
            (0, handleAction_1.handleAction)(logger, 'testID', {
                ref: { current: null },
                onChangeText: onChangeText,
            }, 'CHANGE_TEXT', 'test text');
            expect(onChangeText).toHaveBeenCalledWith('test text');
        });
    });
    describe('SCROLL_TO', function () {
        it('throw error when scrollTo method is not available', function () {
            var test = function () {
                return (0, handleAction_1.handleAction)(logger, 'testID', {
                    ref: { current: null },
                }, 'SCROLL_TO');
            };
            expect(test).toThrow();
        });
        it('throw error when value is not set', function () {
            var scrollTo = jest.fn();
            var test = function () {
                return (0, handleAction_1.handleAction)(logger, 'testID', {
                    ref: { current: { scrollTo: scrollTo } },
                }, 'SCROLL_TO');
            };
            expect(test).toThrow();
        });
        it('calls scrollTo method', function () {
            var scrollTo = jest.fn();
            (0, handleAction_1.handleAction)(logger, 'testID', {
                ref: { current: { scrollTo: scrollTo } },
            }, 'SCROLL_TO', { y: 100 });
            expect(scrollTo).toHaveBeenCalledWith({ y: 100, animated: false });
        });
    });
    describe('SCROLL_TO_END', function () {
        it('throw error when scrollToEnd method is not available', function () {
            var test = function () {
                return (0, handleAction_1.handleAction)(logger, 'testID', {
                    ref: { current: null },
                }, 'PRESS');
            };
            expect(test).toThrow();
        });
        it('calls scrollToEnd method', function () {
            var scrollToEnd = jest.fn();
            (0, handleAction_1.handleAction)(logger, 'testID', {
                ref: { current: { scrollToEnd: scrollToEnd } },
            }, 'SCROLL_TO_END');
            expect(scrollToEnd).toHaveBeenCalled();
        });
    });
});
