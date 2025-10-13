declare const carousel: {
    base: string;
    list: string;
    item: string;
    navigation: {
        container: string;
        button: string;
        prev: string;
        next: string;
    };
    pagination: {
        container: string;
        inner: string;
        item: string;
        active: string;
    };
};
export type CarouselUi = typeof carousel;
export type CarouselNavigationUi = typeof carousel.navigation;
export type CarouselPaginationUi = typeof carousel.pagination;
export default carousel;
