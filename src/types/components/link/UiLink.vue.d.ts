import type { RouteLocationRaw } from 'vue-router';
import type { DeepPartial } from '../types';
import type { LinkUi } from './theme';
export interface UiLinkProps {
    to?: RouteLocationRaw;
    activeClass?: string;
    exactActiveClass?: string;
    variant?: 'primary' | 'unstyled';
    ui?: DeepPartial<LinkUi>;
}
export interface UiLinkEmits {
    (event: 'click', value: MouseEvent): void;
}
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<UiLinkProps, void, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (value: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<UiLinkProps> & Readonly<{
    onClick?: ((value: MouseEvent) => any) | undefined;
}>, {
    variant: "primary" | "unstyled";
    to: RouteLocationRaw;
    activeClass: string;
    exactActiveClass: string;
    ui: DeepPartial<LinkUi>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: (props: {}) => any;
} & {
    default?: (props: {}) => any;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
