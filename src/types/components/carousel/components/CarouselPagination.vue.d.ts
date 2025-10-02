import type { CarouselPaginationUi } from '../theme';
interface CarouselPaginationProps {
    length: number;
    activeIndex: number;
    ui?: CarouselPaginationUi;
}
declare const __VLS_export: import("vue").DefineComponent<CarouselPaginationProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: number) => any;
}, string, import("vue").PublicProps, Readonly<CarouselPaginationProps> & Readonly<{
    onChange?: ((value: number) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
