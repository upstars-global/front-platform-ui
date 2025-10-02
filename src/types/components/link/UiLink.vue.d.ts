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
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<UiLinkProps, void, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
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
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
