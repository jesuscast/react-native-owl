import { ConfigAndroid } from '../types';
export declare const adbInstall: ({ debug, binaryPath, buildType, }: {
    debug?: boolean | undefined;
    binaryPath?: ConfigAndroid['binaryPath'];
    buildType?: ConfigAndroid['buildType'];
}) => Promise<void>;
export declare const adbTerminate: ({ debug, packageName, }: {
    debug?: boolean | undefined;
    packageName: string;
}) => Promise<void>;
export declare const adbLaunch: ({ debug, packageName, }: {
    debug?: boolean | undefined;
    packageName: string;
}) => Promise<void>;
