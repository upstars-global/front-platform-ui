import type { UiIconName } from '../../icon/config';
import type { IconSize } from '../../icon/UiIcon.vue';
import type { UiButtonProps } from '../../button/UiButton.vue';
import type { CarouselNavigationUi } from '../theme';
export interface Navigation {
    iconPrev?: UiIconName;
    iconNext?: UiIconName;
    iconSize?: IconSize;
    buttonVariant?: UiButtonProps['variant'];
    buttonSize?: UiButtonProps['size'];
}
interface CarouselNavigationProps extends Navigation {
    backward?: boolean;
    forward?: boolean;
    ui?: CarouselNavigationUi;
}
declare const _default: import("vue").DefineComponent<CarouselNavigationProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: number) => any;
}, string, import("vue").PublicProps, Readonly<CarouselNavigationProps> & Readonly<{
    onChange?: ((value: number) => any) | undefined;
}>, {
    ui: CarouselNavigationUi;
    iconSize: IconSize;
    iconPrev: UiIconName;
    iconNext: UiIconName;
    buttonVariant: "default" | "primary" | "secondary" | "tertiary" | "ghost";
    buttonSize: "default" | "xs" | "sm" | "md";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
