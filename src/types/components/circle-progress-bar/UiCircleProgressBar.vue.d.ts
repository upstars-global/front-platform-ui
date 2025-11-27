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
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiCircleProgressBarProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiCircleProgressBarProps> & Readonly<{}>, {
    ui: UiProp<CircleProgressBarUi>;
    max: number;
    size: number;
    startAngle: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiCircleProgressBarSlots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
