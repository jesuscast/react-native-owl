/// <reference types="jest" />
declare global {
    namespace jest {
        interface Matchers<R> {
            /** Compares the image passed to the baseline one */
            toMatchBaseline: ({ threshold, diffPixelsThreshold, }?: {
                threshold?: number;
                diffPixelsThreshold?: number;
            }) => CustomMatcherResult;
        }
    }
}
export declare const toMatchBaseline: (latestPath: string, options?: {
    threshold?: number;
    diffPixelsThreshold?: number;
}) => {
    message: () => string;
    pass: boolean;
};
