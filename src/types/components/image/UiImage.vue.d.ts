import type { UiProp } from '../types';
import type { ImageUi } from './theme';
export interface UiImageProps {
    src: string;
    alt: string;
    srcRetina?: string;
    isLazy?: boolean;
    ui?: UiProp<ImageUi>;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<UiImageProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiImageProps> & Readonly<{}>, {
    ui: UiProp<ImageUi>;
    srcRetina: string;
    isLazy: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
