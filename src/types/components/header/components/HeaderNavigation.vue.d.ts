import type { RouteLocationRaw } from 'vue-router';
import type { UiBadgeProps } from '../../badge/UiBadge.vue';
import type { UiIconsNavigation } from '../../icon/config';
import type { HeaderNavigationUi } from '../theme';
export interface HeaderNavigationItem {
    id: string;
    title?: string;
    isHidden?: boolean;
    isSpecial?: boolean;
    icon?: UiIconsNavigation;
    route?: RouteLocationRaw;
    dataTest?: string;
    hasActiveStyles?: boolean;
    hasBackground?: boolean;
    badge?: UiBadgeProps & {
        label?: string;
    };
}
interface HeaderNavigationProps {
    items: HeaderNavigationItem[];
    ui?: HeaderNavigationUi;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<HeaderNavigationProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<HeaderNavigationProps> & Readonly<{}>, {
    ui: HeaderNavigationUi;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
