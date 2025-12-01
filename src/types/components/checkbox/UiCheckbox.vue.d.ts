import type { FormElementProps, UiProp } from '../types';
import type { UiIconName } from '../icon/config';
import type { CheckboxUi } from './theme';
type CheckboxSize = '16' | '20' | '24' | '32' | '40' | '48';
export interface UiCheckboxProps extends FormElementProps {
    icon?: UiIconName;
    checkboxSize?: CheckboxSize;
    error?: string;
    errorIcon?: UiIconName;
    ui?: UiProp<CheckboxUi>;
}
export interface UiCheckboxEmits {
    (event: 'update:modelValue', value: boolean): void;
}
export interface UiCheckboxSlots {
    checkmark(): unknown;
    default(): unknown;
    'error-message'(): unknown;
}
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiCheckboxProps & {
    modelValue?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
} & {
    "update:modelValue": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<UiCheckboxProps & {
    modelValue?: boolean;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
    ui: UiProp<CheckboxUi>;
    icon: UiIconName;
    error: string;
    checkboxSize: CheckboxSize;
    errorIcon: UiIconName;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiCheckboxSlots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
