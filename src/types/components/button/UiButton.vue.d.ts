import type { UiProp } from '../types';
import type { UiIconName } from '../icon/config';
import type { IconSize } from '../icon/UiIcon.vue';
import type { ButtonUi } from './theme';
type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'default';
type ButtonSize = 'xs' | 'sm' | 'md' | 'default';
export interface UiButtonProps {
    size?: ButtonSize;
    variant?: ButtonVariant;
    disabled?: boolean;
    fullWidth?: boolean;
    isActive?: boolean;
    leadingIconName?: UiIconName;
    leadingIconSize?: IconSize;
    trailingIconName?: UiIconName;
    trailingIconSize?: IconSize;
    ui?: UiProp<ButtonUi>;
}
export interface UiButtonEmits {
    (event: 'click', value: MouseEvent): void;
}
export interface UiButtonSlots {
    leading(): unknown;
    default(): unknown;
    trailing(): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiButtonProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (value: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<UiButtonProps> & Readonly<{
    onClick?: ((value: MouseEvent) => any) | undefined;
}>, {
    variant: ButtonVariant;
    size: ButtonSize;
    ui: UiProp<ButtonUi>;
    trailingIconName: UiIconName;
    trailingIconSize: IconSize;
    leadingIconName: UiIconName;
    leadingIconSize: IconSize;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiButtonSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
