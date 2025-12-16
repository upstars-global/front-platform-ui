import type { CircleProgressBarUi } from './theme';
import type { UiProp } from '../types';
export interface UiCircleProgressBarProps {
    progress: number;
    progressWidth: number;
    max?: number;
    size?: number;
    startAngle?: number;
    isAnimation?: boolean;
    rounded?: boolean;
    ui?: UiProp<CircleProgressBarUi>;
}
export interface UiCircleProgressBarSlots {
    default(props?: {
        progress: number;
        max?: number;
    }): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiCircleProgressBarProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiCircleProgressBarProps> & Readonly<{}>, {
    max: number;
    size: number;
    ui: UiProp<CircleProgressBarUi>;
    startAngle: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiCircleProgressBarSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
