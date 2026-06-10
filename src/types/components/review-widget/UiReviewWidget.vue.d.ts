import type { UiProp } from '../types';
import type { ReviewWidgetUi } from './theme';
import type { UiFileUploadEmits, UiFileUploadError, UiFileUploadProps } from '../file-upload/UiFileUpload.vue';
export declare const UI_REVIEW_WIDGET_STATE: {
    readonly DEFAULT: "DEFAULT";
    readonly UNDER_REVIEW: "UNDER_REVIEW";
    readonly APPROVED: "APPROVED";
    readonly ALREADY_CLAIMED: "ALREADY_CLAIMED";
};
export type UiReviewWidgetState = (typeof UI_REVIEW_WIDGET_STATE)[keyof typeof UI_REVIEW_WIDGET_STATE];
export interface UiReviewStateContent {
    image: string;
    imageRetina: string;
    imageAlt: string;
    title?: string;
    description?: string;
}
export interface UiReviewWidgetConfig {
    headerTitle: string;
    states: Partial<Record<UiReviewWidgetState, UiReviewStateContent>>;
}
export type UiReviewWidgetProps = Pick<UiFileUploadProps, 'formats' | 'maxSizeBytes' | 'allowUpload' | 'disabled'> & {
    state: UiReviewWidgetState;
    config: UiReviewWidgetConfig;
    ui?: UiProp<ReviewWidgetUi>;
};
export interface UiReviewWidgetEmits {
    error: UiFileUploadEmits['error'];
    'contact-support': [];
    'upload-click': [];
    upload: [file: File];
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<Pick<UiFileUploadProps, "disabled" | "formats" | "maxSizeBytes" | "allowUpload"> & {
    state: UiReviewWidgetState;
    config: UiReviewWidgetConfig;
    ui?: UiProp<ReviewWidgetUi>;
} & {
    file?: File | null;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (args_0: UiFileUploadError) => any;
    "update:file": (value: File | null) => any;
    "upload-click": () => any;
    upload: (file: File) => any;
    "contact-support": () => any;
}, string, import("vue").PublicProps, Readonly<Pick<UiFileUploadProps, "disabled" | "formats" | "maxSizeBytes" | "allowUpload"> & {
    state: UiReviewWidgetState;
    config: UiReviewWidgetConfig;
    ui?: UiProp<ReviewWidgetUi>;
} & {
    file?: File | null;
}> & Readonly<{
    onError?: ((args_0: UiFileUploadError) => any) | undefined;
    "onUpdate:file"?: ((value: File | null) => any) | undefined;
    "onUpload-click"?: (() => any) | undefined;
    onUpload?: ((file: File) => any) | undefined;
    "onContact-support"?: (() => any) | undefined;
}>, {
    ui: UiProp<ReviewWidgetUi>;
    allowUpload: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    image?: (props: {
        content: UiReviewStateContent;
    }) => any;
} & {
    'file-preview-item-file-size'?: (props: {
        fileSize: number;
    }) => any;
} & {
    'contact-support-button'?: (props: {}) => any;
} & {
    'file-upload-button'?: (props: {}) => any;
} & {
    'file-upload-send-button'?: (props: {}) => any;
} & {
    'file-upload-description'?: (props: {
        formats: string;
        maxSizeBytes: number;
    }) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
