import type { UiProp } from '../types';
import type { SwitchUi } from './theme';
export interface UiSwitchProps {
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    ui?: UiProp<SwitchUi>;
}
export interface UiSwitchEmits {
    (event: 'update:modelValue', value: boolean): void;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<UiSwitchProps & {
    modelValue?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
} & {
    "update:modelValue": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<UiSwitchProps & {
    modelValue?: boolean;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
    size: "sm" | "md" | "lg";
    ui: UiProp<SwitchUi>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
