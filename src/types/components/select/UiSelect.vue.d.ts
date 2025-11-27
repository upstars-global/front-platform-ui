import type { FormElementProps, UiProp } from '../types';
import type { SelectUi } from './theme';
import { type UiTooltipProps } from '../tooltip/UiTooltip.vue';
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
interface UiSelectSlots {
    left?: () => unknown;
    label?: () => unknown;
    'error-message'?: () => unknown;
    description?: () => unknown;
    option?: (props: {
        option: SelectOption;
        index: number;
    }) => unknown;
}
type __VLS_Slots = UiSelectSlots;
declare const __VLS_base: import("vue").DefineComponent<UiSelectProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
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
    fullWidth: boolean;
    dataTest: string;
    modelValue: string | number;
    offsetValue: number;
    subLabel: string;
    selectTextAlign: "left" | "center" | "right";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
