import { type UiFileUploadProps } from '../../components/file-upload/UiFileUpload.vue';
import type { UiProp } from '../../components/types';
import type { ReviewWidgetUi } from './theme';
export declare enum UiReviewWidgetState {
    DEFAULT = "DEFAULT",
    FILE_SELECTED = "FILE_SELECTED",
    UNDER_REVIEW = "UNDER_REVIEW",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    ALREADY_CLAIMED = "ALREADY_CLAIMED"
}
export interface UiReviewStateContent {
    image: string;
    imageAlt: string;
    title?: string;
    description?: string;
}
export interface UiReviewWidgetConfig {
    headerTitle: string;
    states: Partial<Record<UiReviewWidgetState, UiReviewStateContent>>;
}
export type UiReviewWidgetProps = Pick<UiFileUploadProps, 'formats' | 'maxSizeBytes'> & {
    state: UiReviewWidgetState;
    config: UiReviewWidgetConfig;
    ui?: UiProp<ReviewWidgetUi>;
    dataTest?: string;
};
export interface UiReviewWidgetEmits {
    'contact-support': [];
    upload: [file: File];
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<Pick<UiFileUploadProps, "formats" | "maxSizeBytes"> & {
    state: UiReviewWidgetState;
    config: UiReviewWidgetConfig;
    ui?: UiProp<ReviewWidgetUi>;
    dataTest?: string;
} & {
    file?: File | null;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:file": (value: File | null) => any;
    upload: (file: File) => any;
    "contact-support": () => any;
}, string, import("vue").PublicProps, Readonly<Pick<UiFileUploadProps, "formats" | "maxSizeBytes"> & {
    state: UiReviewWidgetState;
    config: UiReviewWidgetConfig;
    ui?: UiProp<ReviewWidgetUi>;
    dataTest?: string;
} & {
    file?: File | null;
}> & Readonly<{
    "onUpdate:file"?: ((value: File | null) => any) | undefined;
    onUpload?: ((file: File) => any) | undefined;
    "onContact-support"?: (() => any) | undefined;
}>, {
    ui: UiProp<ReviewWidgetUi>;
    dataTest: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    image?: (props: {
        content: UiReviewStateContent;
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
