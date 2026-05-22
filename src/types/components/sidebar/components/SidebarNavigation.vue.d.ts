import type { RouteLocationRaw } from 'vue-router';
import type { UiIconName } from '../../icon/config';
import type { UiImageProps } from '../../image/UiImage.vue';
import type { SidebarNavigationUi } from '../theme';
export interface SidebarNavigationItem {
    title: string;
    icon: UiIconName;
    image?: UiImageProps;
    route: RouteLocationRaw;
    hide?: boolean;
    dataTest?: string;
    visibleOnlyOnXs?: boolean;
    theme?: 'special';
    hasBackground?: boolean;
    badge?: {
        label: string;
        theme: string;
    };
}
interface SidebarNavigationProps {
    items: SidebarNavigationItem[];
    ui?: SidebarNavigationUi;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<SidebarNavigationProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SidebarNavigationProps> & Readonly<{}>, {
    ui: SidebarNavigationUi;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
