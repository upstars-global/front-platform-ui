import type { UiProp } from '../types';
import type { BadgeUi } from './theme';
import type { UiIconName } from '../icon/config';
import type { IconSize } from '../icon/UiIcon.vue';
type BadgeVariant = 'default' | 'cropped' | 'counter';
type BadgeSize = 'sm' | 'md' | 'default';
export interface UiBadgeProps {
    size?: BadgeSize;
    variant?: BadgeVariant;
    leadingIconName?: UiIconName;
    leadingIconSize?: IconSize;
    trailingIconName?: UiIconName;
    trailingIconSize?: IconSize;
    ui?: UiProp<BadgeUi>;
}
export interface UiBadgeSlots {
    leading(): unknown;
    default(): unknown;
    trailing(): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiBadgeProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiBadgeProps> & Readonly<{}>, {
    variant: BadgeVariant;
    size: BadgeSize;
    ui: UiProp<BadgeUi>;
    trailingIconName: UiIconName;
    trailingIconSize: IconSize;
    leadingIconName: UiIconName;
    leadingIconSize: IconSize;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiBadgeSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
