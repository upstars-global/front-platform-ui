import type { FormElementProps, UiProp } from '../types';
import type { UiTooltipProps } from '../tooltip/UiTooltip.vue';
import type { SelectUi } from './theme';
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
    options?: SelectOption[];
    placeholder?: string;
    id?: string;
    size?: 'small' | 'medium';
    fullWidth?: boolean;
}
export interface UiSelectEmits {
    (event: 'update:modelValue', value: string | number): void;
    (event: 'change', value: string | number): void;
    (event: 'focus', value: FocusEvent): void;
    (event: 'blur', value: FocusEvent): void;
}
export interface UiSelectSlots {
    left?: () => unknown;
    label?: () => unknown;
    'error-message'?: () => unknown;
    description?: () => unknown;
    option?: (props: {
        option: SelectOption;
        index: number;
    }) => unknown;
}
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiSelectProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: string | number) => any;
    change: (value: string | number) => any;
    focus: (value: FocusEvent) => any;
    blur: (value: FocusEvent) => any;
}, string, import("vue").PublicProps, Readonly<UiSelectProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
    onChange?: ((value: string | number) => any) | undefined;
    onFocus?: ((value: FocusEvent) => any) | undefined;
    onBlur?: ((value: FocusEvent) => any) | undefined;
}>, {
    offsetValue: number;
    dataTest: string;
    modelValue: string | number;
    error: string;
    description: string;
    subLabel: string;
    ui: UiProp<SelectUi>;
    placeholder: string;
    id: string;
    selectTextAlign: "left" | "center" | "right";
    options: SelectOption[];
    size: "small" | "medium";
    fullWidth: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiSelectSlots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
