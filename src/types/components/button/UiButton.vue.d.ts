import { type ButtonProps, type ButtonSlots, type ButtonType } from './Button.types';
type __VLS_Slots = ButtonSlots;
declare const __VLS_component: import("vue").DefineComponent<ButtonProps, void, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (value: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<ButtonProps> & Readonly<{
    onClick?: ((value: MouseEvent) => any) | undefined;
}>, {
    variant: import("./Button.types").ButtonVariant;
    type: ButtonType;
    color: import("./Button.types").ButtonColor;
    size: import("./Button.types").ButtonSize;
    buttonType: "submit" | "button";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
