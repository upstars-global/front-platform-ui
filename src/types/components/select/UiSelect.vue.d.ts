import type { FormElementProps, UiProp } from '../types';
import type { SelectUi } from './theme';
import type { UiTooltipProps } from '../../types/components/tooltip/UiTooltip.vue';
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
    selectTextAlign: "left" | "center" | "right";
    options: SelectOption[];
    placeholder: string;
    id: string;
    size: "small" | "medium";
    fullWidth: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
