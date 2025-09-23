import type { UiProp } from '../types';
import type { UiIconName } from '../icon/config';
import type { IconSize } from '../icon/UiIcon.vue';
import type { ButtonUi } from './theme';
type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'default';
type ButtonSize = 'sm' | 'md' | 'lg' | 'default';
export interface UiButtonProps {
    size?: ButtonSize;
    variant?: ButtonVariant;
    disabled?: boolean;
    fullWidth?: boolean;
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
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<UiButtonProps, void, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (value: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<UiButtonProps> & Readonly<{
    onClick?: ((value: MouseEvent) => any) | undefined;
}>, {
    variant: ButtonVariant;
    size: ButtonSize;
    ui: UiProp<ButtonUi>;
    leadingIconName: UiIconName;
    leadingIconSize: IconSize;
    trailingIconName: UiIconName;
    trailingIconSize: IconSize;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiButtonSlots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
