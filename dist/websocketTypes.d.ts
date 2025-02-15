export declare type SOCKET_TEST_ACTION = 'PRESS' | 'LONG_PRESS' | 'CHANGE_TEXT' | 'SCROLL_TO' | 'SCROLL_TO_END';
export declare type LAYOUT_ACTION = 'EXISTS';
export declare type SOCKET_SCROLL_TO_VALUE = {
    x?: number | undefined;
    y?: number | undefined;
    animated?: boolean | undefined;
};
export declare type SOCKET_TEST_REQUEST_VALUE = string | SOCKET_SCROLL_TO_VALUE;
export declare type SOCKET_TEST_REQUEST = {
    type: 'ACTION';
    action: SOCKET_TEST_ACTION;
    testID: string;
    value?: SOCKET_TEST_REQUEST_VALUE;
} | {
    type: 'LAYOUT';
    action: LAYOUT_ACTION;
    testID: string;
};
export declare type SOCKET_CLIENT_RESPONSE = {
    type: 'DONE';
} | {
    type: 'NOT_FOUND';
    testID: string;
} | {
    type: 'ERROR';
    message: string;
    testID: string;
};
