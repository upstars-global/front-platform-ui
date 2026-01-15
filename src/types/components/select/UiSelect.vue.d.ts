import type { FormElementProps, UiProp } from '../types';
import type { UiTooltipProps } from '../tooltip/UiTooltip.vue';
import type { SelectUi } from './theme';
import type { Slot } from 'vue';
export interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}
export interface UiSelectProps extends FormElementProps, Partial<Pick<UiTooltipProps, 'offsetValue'>> {
    dataTest?: string;
    modelValue?: string | number;
    error?: string;
    description?: string;
    subLabel?: string;
    ui?: UiProp<SelectUi>;
    selectTextAlign?: 'left' | 'center' | 'right';
    fullWidth?: boolean;
    size?: 'small' | 'medium';
    options?: SelectOption[];
    autocomplete: string;
    placeholder?: string;
    id?: string;
}
export interface UiSelectEmits {
    (event: 'update:modelValue', value: string | number): void;
    (event: 'change', value: string | number): void;
    (event: 'focus', value: FocusEvent): void;
    (event: 'blur', value: FocusEvent): void;
}
export interface UiSelectSlots {
    left?: Slot;
    label?: Slot;
    'error-message'?: Slot;
    description?: Slot;
    option?: (props: {
        option: SelectOption;
        index: number;
    }) => unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiSelectProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: string | number) => any;
    blur: (value: FocusEvent) => any;
    focus: (value: FocusEvent) => any;
    "update:modelValue": (value: string | number) => any;
}, string, import("vue").PublicProps, Readonly<UiSelectProps> & Readonly<{
    onChange?: ((value: string | number) => any) | undefined;
    onBlur?: ((value: FocusEvent) => any) | undefined;
    onFocus?: ((value: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
}>, {
    error: string;
    id: string;
    options: SelectOption[];
    size: "small" | "medium";
    description: string;
    placeholder: string;
    ui: UiProp<SelectUi>;
    dataTest: string;
    fullWidth: boolean;
    modelValue: string | number;
    offsetValue: number;
    subLabel: string;
    selectTextAlign: "left" | "center" | "right";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiSelectSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
