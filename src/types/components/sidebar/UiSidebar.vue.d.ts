import type { UiProp } from '../types';
import type { UiIconName } from '../icon/config';
import type { IconSize } from '../icon/UiIcon.vue';
import type { SidebarNavigationItem } from './components/SidebarNavigation.vue';
import type { SidebarUi } from './theme';
export interface UiSidebarProps {
    navigation?: SidebarNavigationItem[];
    title?: string;
    closeIconName?: UiIconName;
    closeIconSize?: IconSize;
    side?: 'left' | 'right';
    variant?: 'component-a' | 'component-b' | 'component-c' | 'component-d';
    ui?: UiProp<SidebarUi>;
}
export interface UiSidebarEmits {
    (event: 'update:open', value: boolean): void;
}
export interface UiSidebarSlots {
    header(): unknown;
    title(): unknown;
    content(): unknown;
    default(): unknown;
    footer(): unknown;
    time(): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiSidebarProps & {
    open?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:open": (value: boolean) => any;
} & {
    "update:open": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<UiSidebarProps & {
    open?: boolean;
}> & Readonly<{
    "onUpdate:open"?: ((value: boolean) => any) | undefined;
}>, {
    title: string;
    navigation: SidebarNavigationItem[];
    ui: UiProp<SidebarUi>;
    closeIconName: UiIconName;
    closeIconSize: IconSize;
    side: "left" | "right";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiSidebarSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
