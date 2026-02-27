import type { UiProp } from '../types';
import type { BadgeTimerUi } from './theme';
import type { UiTimerProps } from '../timer/UiTimer.vue';
type BadgeTimerIndicatorType = 'success' | 'error' | 'warning' | 'info';
type BadgeTimerVariant = 'default' | 'outline' | 'soft';
type BadgeTimerSize = 'sm' | 'md';
export interface UiBadgeTimerProps {
    size?: BadgeTimerSize;
    variant?: BadgeTimerVariant;
    isCropped?: boolean;
    indicatorType?: BadgeTimerIndicatorType;
    showIndicator?: boolean;
    label?: string;
    timer: UiTimerProps & {
        dataTest?: string;
    };
    ui?: UiProp<BadgeTimerUi>;
}
export interface UiBadgeTimerEmits {
    (event: 'finish'): void;
}
export interface UiBadgeTimerSlots {
    leading(): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiBadgeTimerProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    finish: () => any;
}, string, import("vue").PublicProps, Readonly<UiBadgeTimerProps> & Readonly<{
    onFinish?: (() => any) | undefined;
}>, {
    variant: BadgeTimerVariant;
    label: string;
    size: BadgeTimerSize;
    ui: UiProp<BadgeTimerUi>;
    indicatorType: BadgeTimerIndicatorType;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiBadgeTimerSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
