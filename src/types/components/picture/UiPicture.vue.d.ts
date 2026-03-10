import type { UiProp } from '../types';
import type { PictureUi } from './theme';
export interface UiPictureProps {
    src: string;
    alt: string;
    provider: string;
    isLazy?: boolean;
    groupType?: string;
    query?: Record<string, string | string[]>;
    fetchPriority?: 'high' | 'low' | 'auto';
    ui?: UiProp<PictureUi>;
}
export interface UiPictureEmits {
    (event: 'onLoad', value: boolean): void;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<UiPictureProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    onLoad: (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<UiPictureProps> & Readonly<{
    onOnLoad?: ((value: boolean) => any) | undefined;
}>, {
    isLazy: boolean;
    groupType: string;
    query: Record<string, string | string[]>;
    fetchPriority: "high" | "low" | "auto";
    ui: UiProp<PictureUi>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
