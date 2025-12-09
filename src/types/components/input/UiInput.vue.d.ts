import type { FormElementProps, UiProp } from '../types';
import type { UiTooltipProps } from '../tooltip/UiTooltip.vue';
import type { InputUi } from './theme';
export interface UiInputProps extends FormElementProps, Partial<Pick<UiTooltipProps, 'offsetValue'>> {
    dataTest?: string;
    modelValue?: string | undefined;
    error?: string;
    description?: string;
    subLabel?: string;
    recommendations?: string[] | null;
    ui?: UiProp<InputUi>;
    mask?: string | Record<string, unknown>;
    inputTextAlign?: 'left' | 'center' | 'right';
    placeholder?: string;
    autocomplete?: string;
    autofocus?: boolean;
    min?: number | string;
    max?: number | string;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date';
    id?: string;
    pattern?: string;
    step?: number | string;
    maxlength?: number;
}
export interface UiInputEmits {
    (event: 'update:modelValue', value: string): void;
    (event: 'change', value: string): void;
    (event: 'focus', value: FocusEvent): void;
    (event: 'blur', value: FocusEvent): void;
    (event: 'keydown', value: KeyboardEvent): void;
}
export interface UiInputSlots {
    left?: () => unknown;
    right?: () => unknown;
    label?: () => unknown;
    'error-message'?: () => unknown;
    description?: () => unknown;
}
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiInputProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: string) => any;
    blur: (value: FocusEvent) => any;
    focus: (value: FocusEvent) => any;
    keydown: (value: KeyboardEvent) => any;
    "update:modelValue": (value: string) => any;
}, string, import("vue").PublicProps, Readonly<UiInputProps> & Readonly<{
    onChange?: ((value: string) => any) | undefined;
    onBlur?: ((value: FocusEvent) => any) | undefined;
    onFocus?: ((value: FocusEvent) => any) | undefined;
    onKeydown?: ((value: KeyboardEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
    max: number | string;
    type: "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "date";
    error: string;
    id: string;
    min: number | string;
    mask: string | Record<string, unknown>;
    pattern: string;
    autocomplete: string;
    description: string;
    step: number | string;
    placeholder: string;
    maxlength: number;
    ui: UiProp<InputUi>;
    dataTest: string;
    modelValue: string;
    offsetValue: number;
    subLabel: string;
    recommendations: string[];
    inputTextAlign: "left" | "center" | "right";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiInputSlots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
