import type { UiProp } from '../types';
import type { ProgressBarUi } from './theme';
export interface UiProgressBarProps {
    progress: number;
    max?: number;
    min?: number;
    size?: 'sm' | 'md';
    ui?: UiProp<ProgressBarUi>;
}
export type UiProgressBarSlots = {
    default?: () => void;
    inside?: () => void;
    top?: () => void;
};
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiProgressBarProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiProgressBarProps> & Readonly<{}>, {
    max: number;
    min: number;
    size: "sm" | "md";
    ui: UiProp<ProgressBarUi>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiProgressBarSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
