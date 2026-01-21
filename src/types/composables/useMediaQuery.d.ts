export declare const mediaMaxBreakpoints: {
    readonly XS: 359;
    readonly SM: 479;
    readonly MD: 767;
    readonly LG: 1023;
    readonly XL: 1439;
};
type MediaMaxBreakpoints = (typeof mediaMaxBreakpoints)[keyof typeof mediaMaxBreakpoints];
export declare const useMediaQuery: (mediaMax?: MediaMaxBreakpoints) => {
    isMediaMatch: import("vue").ComputedRef<boolean>;
};
export {};
