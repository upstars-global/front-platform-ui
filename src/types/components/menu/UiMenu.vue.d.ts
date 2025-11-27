import type { RouteLocationRaw } from 'vue-router';
import type { UiIconName } from '../icon/config';
import type { UiProp } from '../types';
import type { MenuUi } from './theme';
export interface UiMenuItem {
    routerName?: string;
    label?: string;
    iconName?: UiIconName;
    isHidden?: boolean;
    to?: RouteLocationRaw | string;
    dataTest?: string;
}
export interface UiMenuProps {
    items: UiMenuItem[];
    ui?: UiProp<MenuUi>;
}
declare const __VLS_export: import("vue").DefineComponent<UiMenuProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiMenuProps> & Readonly<{}>, {
    ui: UiProp<MenuUi>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
