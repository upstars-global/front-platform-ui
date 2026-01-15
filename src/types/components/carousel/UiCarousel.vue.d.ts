import type { CarouselUi } from './theme';
import type { UiProp } from '../types';
import type { Navigation } from './components/CarouselNavigation.vue';
export interface UiCarouselProps {
    activeIndex?: number;
    autoplay?: number;
    disableFadeEffect?: boolean;
    showPagination?: boolean;
    showNavigation?: boolean;
    transparentBorder?: boolean;
    navigation?: Navigation;
    ui?: UiProp<CarouselUi>;
}
export interface UiCarouselEmits {
    (event: 'change:page', value: number): void;
}
export interface UiCarouselSlots {
    default(): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiCarouselProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "change:page": (value: number) => any;
}, string, import("vue").PublicProps, Readonly<UiCarouselProps> & Readonly<{
    "onChange:page"?: ((value: number) => any) | undefined;
}>, {
    autoplay: number;
    ui: UiProp<CarouselUi>;
    activeIndex: number;
    showNavigation: boolean;
    navigation: Navigation;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiCarouselSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
