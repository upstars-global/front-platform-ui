import type { UiProp } from '../types';
import type { BadgeUi } from './theme';
type BadgeVariant = 'default' | 'cropped' | 'counter';
type BadgeSize = 'sm' | 'md' | 'default';
export interface UiBadgeProps {
    size?: BadgeSize;
    variant?: BadgeVariant;
    ui?: UiProp<BadgeUi>;
}
export interface UiBadgeSlots {
    default: () => unknown;
}
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiBadgeProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiBadgeProps> & Readonly<{}>, {
    variant: BadgeVariant;
    size: BadgeSize;
    ui: UiProp<BadgeUi>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiBadgeSlots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
