import type { UiProp } from '../types';
import type { TimerUi } from './theme';
export interface UiTimerProps {
    deadline: Date | string | number | null;
    labels?: {
        days?: string | null;
        hours?: string | null;
        minutes?: string | null;
        seconds?: string | null;
    };
    showDots?: boolean;
    ui?: UiProp<TimerUi>;
}
export interface UiTimerEmits {
    (event: 'finish'): void;
}
export interface UiTimerSlots {
    leading(): unknown;
    trailing(): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiTimerProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    finish: () => any;
}, string, import("vue").PublicProps, Readonly<UiTimerProps> & Readonly<{
    onFinish?: (() => any) | undefined;
}>, {
    labels: {
        days?: string | null;
        hours?: string | null;
        minutes?: string | null;
        seconds?: string | null;
    };
    ui: UiProp<TimerUi>;
    showDots: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiTimerSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
