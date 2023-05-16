"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWebSocket = void 0;
var constants_1 = require("../constants");
var constants_2 = require("./constants");
/**
 * Create a connection to the websocket server,
 * and call the onMessage callback when it receives any messages.
 */
var initWebSocket = function (logger, platform, onMessage) {
    var ipAddress = platform === 'android' ? constants_2.ANDROID_WS_HOST : constants_2.IOS_WS_HOST;
    var ws = new WebSocket("ws://" + ipAddress + ":" + constants_1.WEBSOCKET_PORT);
    return new Promise(function (resolve, reject) {
        ws.onopen = function () {
            logger.info('[OWL - Websocket] onopen');
            ws.send('OWL Client Connected!');
            resolve(ws);
        };
        ws.onmessage = function (e) {
            logger.info("[OWL - Websocket] onmessage: " + e.data);
            onMessage(e.data.toString());
        };
        ws.onerror = function (e) {
            logger.info("[OWL - Websocket] onerror: " + e.message);
        };
        ws.onclose = function (e) {
            logger.info("[OWL - Websocket] onclose: " + e.reason);
            reject(e);
        };
    });
};
exports.initWebSocket = initWebSocket;
