import 'overlayscrollbars/overlayscrollbars.css';
import type { OverlayScrollbars, ScrollbarsAutoHideBehavior, ScrollbarsVisibilityBehavior, OverflowBehavior } from 'overlayscrollbars';
import type { ScrollUi } from './theme';
import type { UiProp } from '../types';
export interface UiScrollProps {
    autoHide?: ScrollbarsAutoHideBehavior;
    autoHideDelay?: number;
    autoHideSuspend?: boolean;
    visibility?: ScrollbarsVisibilityBehavior;
    theme?: string | null;
    dragScroll?: boolean;
    clickScroll?: boolean;
    pointers?: string[] | null;
    overflowX?: OverflowBehavior;
    overflowY?: OverflowBehavior;
    showNativeOverlaidScrollbars?: boolean;
    defer?: boolean;
    bodyScrollLockIgnore?: boolean;
    infiniteScroll?: boolean;
    infiniteScrollMargin?: number;
    ui?: UiProp<ScrollUi>;
}
export interface UiScrollEmits {
    (event: 'scroll', instance: OverlayScrollbars): void;
    (event: 'infiniteScroll'): void;
}
export interface UiScrollSlots {
    default(): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiScrollProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    scroll: (instance: OverlayScrollbars) => any;
    infiniteScroll: () => any;
}, string, import("vue").PublicProps, Readonly<UiScrollProps> & Readonly<{
    onScroll?: ((instance: OverlayScrollbars) => any) | undefined;
    onInfiniteScroll?: (() => any) | undefined;
}>, {
    defer: boolean;
    overflowX: OverflowBehavior;
    overflowY: OverflowBehavior;
    visibility: ScrollbarsVisibilityBehavior;
    ui: UiProp<ScrollUi>;
    theme: string | null;
    showNativeOverlaidScrollbars: boolean;
    autoHide: ScrollbarsAutoHideBehavior;
    autoHideDelay: number;
    autoHideSuspend: boolean;
    dragScroll: boolean;
    clickScroll: boolean;
    pointers: string[] | null;
    infiniteScroll: boolean;
    bodyScrollLockIgnore: boolean;
    infiniteScrollMargin: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiScrollSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
