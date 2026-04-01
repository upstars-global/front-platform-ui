import type { RouteLocationRaw } from 'vue-router';
import type { UiProp } from '../types';
import type { UiIconName } from '../icon/config';
import type { BottomBarUi } from './theme';
interface BottomBarNavigationItem {
    id: string;
    label: string;
    icon: UiIconName;
    dataTest: string;
    to?: RouteLocationRaw;
    counter?: number;
    isHidden?: boolean;
}
export interface UiBottomBarProps {
    labels: {
        signIn: string;
        signUp: string;
        cashbox: string;
        sidebar: string;
    };
    navigation: BottomBarNavigationItem[];
    variant?: 'component-a' | 'component-b' | 'component-c' | 'component-d';
    isLockAuthButtons?: boolean;
    notificationCounter?: number;
    isLoggedIn?: boolean;
    ui?: UiProp<BottomBarUi>;
}
export interface UiBottomBarEmits {
    (event: 'click:sign-in'): void;
    (event: 'click:sign-up'): void;
    (event: 'open:sidebar'): void;
    (event: 'open:cashbox'): void;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiBottomBarProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "click:sign-in": () => any;
    "click:sign-up": () => any;
    "open:sidebar": () => any;
    "open:cashbox": () => any;
}, string, import("vue").PublicProps, Readonly<UiBottomBarProps> & Readonly<{
    "onClick:sign-in"?: (() => any) | undefined;
    "onClick:sign-up"?: (() => any) | undefined;
    "onOpen:sidebar"?: (() => any) | undefined;
    "onOpen:cashbox"?: (() => any) | undefined;
}>, {
    variant: "component-a" | "component-b" | "component-c" | "component-d";
    ui: UiProp<BottomBarUi>;
    notificationCounter: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: (props: {}) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
