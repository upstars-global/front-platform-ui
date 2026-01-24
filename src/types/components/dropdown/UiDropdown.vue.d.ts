import type { UiProp } from '../types';
import type { DropdownUi } from './theme';
export interface UiDropdownProps {
    offset?: number;
    placement?: 'bottom' | 'bottom-end' | 'bottom-start';
    ui?: UiProp<DropdownUi>;
}
export interface UiDropdownSlots {
    activator(): unknown;
    default(props: {
        hide: () => void;
    }): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiDropdownProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiDropdownProps> & Readonly<{}>, {
    offset: number;
    ui: UiProp<DropdownUi>;
    placement: "bottom" | "bottom-end" | "bottom-start";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    activator?: (props: {}) => any;
} & {
    default?: (props: {
        hide: () => void;
    }) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
