interface CircleProgressBarProps {
    progress: number;
    progressWidth: number;
    max?: number;
    background?: string;
    progressColor?: string;
    trailColor?: string;
    size?: number;
    startAngle?: number;
    isAnimation?: boolean;
    rounded?: boolean;
}
declare var __VLS_1: {
    progress: number;
    max: number;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import("vue").DefineComponent<CircleProgressBarProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CircleProgressBarProps> & Readonly<{}>, {
    max: number;
    background: string;
    size: number;
    progressColor: string;
    trailColor: string;
    startAngle: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
