import type { FormElementProps } from '../types';
import type { UiIconName } from '../icon/config';
interface CheckboxProps extends FormElementProps {
    icon?: UiIconName;
    requiredMessage?: string;
    error?: string;
}
type __VLS_Props = CheckboxProps;
type __VLS_PublicProps = __VLS_Props & {
    'modelValue': boolean;
};
declare var __VLS_1: {}, __VLS_7: {}, __VLS_9: {}, __VLS_15: {};
type __VLS_Slots = {} & {
    checkmark?: (props: typeof __VLS_1) => any;
} & {
    label?: (props: typeof __VLS_7) => any;
} & {
    'error-message'?: (props: typeof __VLS_9) => any;
} & {
    'required-message'?: (props: typeof __VLS_15) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
} & {
    "update:modelValue": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
