import type { FormElementProps, UiProp } from '../types';
import type { UiTooltipProps } from '../tooltip/UiTooltip.vue';
import type { InputUi } from './theme';
import type { Slot } from 'vue';
export interface UiInputProps<T extends {
    value: string;
} = {
    value: string;
}> extends FormElementProps, Partial<Pick<UiTooltipProps, 'offsetValue'>> {
    dataTest?: string;
    modelValue?: string | undefined;
    error?: string;
    description?: string;
    subLabel?: string;
    recommendations?: T[] | null;
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
export interface UiInputSlots<T extends {
    value: string;
} = {
    value: string;
}> {
    left?: Slot;
    right?: Slot;
    label?: Slot;
    'error-message'?: Slot;
    description?: Slot;
    recommendation?: (props: {
        recommendation: T;
    }) => unknown;
}
declare const __VLS_export: <T extends {
    value: string;
} = {
    value: string;
}>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<UiInputProps<T> & {
        onChange?: ((value: string) => any) | undefined;
        onBlur?: ((value: FocusEvent) => any) | undefined;
        onFocus?: ((value: FocusEvent) => any) | undefined;
        onKeydown?: ((value: KeyboardEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    }> & import("vue").PublicProps;
    expose: (exposed: {}) => void;
    attrs: any;
    slots: UiInputSlots<T>;
    emit: UiInputEmits;
}>) => import("vue").VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T as K]: T[K];
} & {};
