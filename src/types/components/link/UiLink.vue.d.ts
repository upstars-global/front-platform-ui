import type { RouteLocationRaw } from 'vue-router';
import type { ClassNameValue } from 'tailwind-merge';
import type { UiProp } from '../types';
import type { LinkUi } from './theme';
export interface UiLinkProps {
    to?: RouteLocationRaw;
    activeClass?: ClassNameValue;
    exactActiveClass?: ClassNameValue;
    variant?: 'primary' | 'default';
    ui?: UiProp<LinkUi>;
}
export interface UiLinkEmits {
    (event: 'click', value: MouseEvent): void;
}
export interface UiLinkSlots {
    default: () => unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiLinkProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (value: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<UiLinkProps> & Readonly<{
    onClick?: ((value: MouseEvent) => any) | undefined;
}>, {
    variant: "primary" | "default";
    to: RouteLocationRaw;
    ui: UiProp<LinkUi>;
    activeClass: string | false | 0 | 0n | ClassNameValue[] | null;
    exactActiveClass: string | false | 0 | 0n | ClassNameValue[] | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiLinkSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
