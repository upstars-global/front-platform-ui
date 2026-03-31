import type { UiProp } from '../types';
import type { PopoverUi } from './theme';
export interface UiPopoverProps {
    offset?: number;
    placement?: 'bottom' | 'bottom-end' | 'bottom-start';
    ui?: UiProp<PopoverUi>;
}
export interface UiPopoverEmits {
    (event: 'update:open', value: boolean): void;
}
export interface UiPopoverSlots {
    anchor(props: {
        isOpen: boolean;
        toggleHandler: () => void;
    }): unknown;
    content(props: {
        hideHandler: () => void;
    }): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiPopoverProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:open": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<UiPopoverProps> & Readonly<{
    "onUpdate:open"?: ((value: boolean) => any) | undefined;
}>, {
    offset: number;
    ui: UiProp<PopoverUi>;
    placement: "bottom" | "bottom-end" | "bottom-start";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiPopoverSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
