import WebSocket from 'ws';
import { Logger } from './logger';
export declare const startWebSocketServer: (logger: Logger) => Promise<WebSocket.Server>;
export declare const createWebSocketClient: (logger: Logger, onMessage: (message: string) => void) => Promise<WebSocket>;
