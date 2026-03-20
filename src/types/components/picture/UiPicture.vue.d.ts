import type { UiProp } from '../types';
import type { PictureUi } from './theme';
export interface UiPictureProps<Metadata = Record<string, unknown>, Provider = string> {
    src: string;
    alt: string;
    provider?: Provider;
    meta?: Metadata;
    sources?: Array<{
        srcset: string;
        media: string;
    }>;
    isLazy?: boolean;
    fetchPriority?: 'high' | 'low' | 'auto';
    ui?: UiProp<PictureUi>;
}
export interface UiPictureEmits {
    (event: 'onLoad', value: boolean): void;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<UiPictureProps<Record<string, unknown>, string>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    onLoad: (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<UiPictureProps<Record<string, unknown>, string>> & Readonly<{
    onOnLoad?: ((value: boolean) => any) | undefined;
}>, {
    meta: Record<string, unknown>;
    ui: UiProp<PictureUi>;
    isLazy: boolean;
    provider: string;
    sources: Array<{
        srcset: string;
        media: string;
    }>;
    fetchPriority: "high" | "low" | "auto";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
