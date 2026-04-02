import type { UiProp } from '../types';
import type { UiButtonProps } from '../button/UiButton.vue';
import type { UiImageProps } from '../image/UiImage.vue';
import type { UiPictureProps } from '../picture/UiPicture.vue';
import type { BannerUi } from './theme';
interface BannerButton extends UiButtonProps {
    label?: string;
    url?: string;
}
export interface UiBannerProps {
    backgroundColor?: string;
    button?: BannerButton;
    content?: string;
    image?: UiImageProps;
    picture?: UiPictureProps;
    variant?: 'default';
    ui?: UiProp<BannerUi>;
}
export interface UiBannerEmits {
    (event: 'click', value: MouseEvent): void;
}
export interface UiBannerSlots {
    content(): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiBannerProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (value: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<UiBannerProps> & Readonly<{
    onClick?: ((value: MouseEvent) => any) | undefined;
}>, {
    variant: "default";
    button: BannerButton;
    backgroundColor: string;
    content: string;
    picture: UiPictureProps;
    image: UiImageProps;
    ui: UiProp<BannerUi>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiBannerSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
