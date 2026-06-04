import type { UiProp } from '../types';
import type { FileUploadUi } from './theme';
export interface UiFileUploadProps {
    formats?: string[];
    maxSizeBytes?: number;
    disabled?: boolean;
    ui?: UiProp<FileUploadUi>;
}
export declare const UI_FILE_UPLOAD_ERROR_TYPE: {
    readonly FORMAT: "format";
    readonly SIZE: "size";
};
export type UiFileUploadErrorType = (typeof UI_FILE_UPLOAD_ERROR_TYPE)[keyof typeof UI_FILE_UPLOAD_ERROR_TYPE];
export interface UiFileUploadEmits {
    error: [type: UiFileUploadErrorType, meta: {
        formats?: string[];
        maxSizeBytes?: number;
    }];
    upload: [file: File];
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiFileUploadProps & {
    file?: File | null;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (type: UiFileUploadErrorType, meta: {
        formats?: string[];
        maxSizeBytes?: number;
    }) => any;
    "update:file": (value: File | null) => any;
    upload: (file: File) => any;
}, string, import("vue").PublicProps, Readonly<UiFileUploadProps & {
    file?: File | null;
}> & Readonly<{
    onError?: ((type: UiFileUploadErrorType, meta: {
        formats?: string[];
        maxSizeBytes?: number;
    }) => any) | undefined;
    "onUpdate:file"?: ((value: File | null) => any) | undefined;
    onUpload?: ((file: File) => any) | undefined;
}>, {
    disabled: boolean;
    ui: UiProp<FileUploadUi>;
    formats: string[];
    maxSizeBytes: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    'send-button'?: (props: {}) => any;
} & {
    button?: (props: {}) => any;
} & {
    description?: (props: {
        formats: string;
        maxSizeBytes: number;
    }) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
