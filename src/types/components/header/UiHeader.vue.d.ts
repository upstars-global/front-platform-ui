import type { RouteLocationRaw } from 'vue-router';
import type { UiProp } from '../types';
import type { UiImageProps } from '../image/UiImage.vue';
import type { HeaderNavigationItem } from './components/HeaderNavigation.vue';
import type { HeaderUi } from './theme';
export interface UiHeaderProps {
    chatMessageCount?: number;
    isMobileChatButton?: boolean;
    logo?: UiImageProps;
    logoRoute?: RouteLocationRaw;
    navigation?: HeaderNavigationItem[];
    variant?: 'simple' | 'component-a' | 'component-b' | 'component-c' | 'component-d';
    ui?: UiProp<HeaderUi>;
}
export interface UiHeaderEmits {
    (event: 'click:logo', value: MouseEvent): void;
    (event: 'open:chat'): void;
}
export interface UiHeaderSlots {
    top(): unknown;
    ['chat-content'](): unknown;
    content(): unknown;
    bottom(): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiHeaderProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "click:logo": (value: MouseEvent) => any;
    "open:chat": () => any;
}, string, import("vue").PublicProps, Readonly<UiHeaderProps> & Readonly<{
    "onClick:logo"?: ((value: MouseEvent) => any) | undefined;
    "onOpen:chat"?: (() => any) | undefined;
}>, {
    variant: "simple" | "component-a" | "component-b" | "component-c" | "component-d";
    ui: UiProp<HeaderUi>;
    navigation: HeaderNavigationItem[];
    chatMessageCount: number;
    logo: UiImageProps;
    logoRoute: RouteLocationRaw;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiHeaderSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
