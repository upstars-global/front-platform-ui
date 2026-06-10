import type { UiProp } from '../types';
import type { FileUploadUi } from './theme';
export interface UiFileUploadProps {
    formats?: string[];
    maxSizeBytes?: number;
    allowUpload?: boolean;
    disabled?: boolean;
    ui?: UiProp<FileUploadUi>;
}
export declare const UI_FILE_UPLOAD_ERROR_TYPE: {
    readonly FORMAT: "format";
    readonly SIZE: "size";
};
export type UiFileUploadErrorType = (typeof UI_FILE_UPLOAD_ERROR_TYPE)[keyof typeof UI_FILE_UPLOAD_ERROR_TYPE];
export type UiFileUploadError = {
    type: 'format';
    meta: {
        formats: string[];
    };
} | {
    type: 'size';
    meta: {
        maxSizeBytes: number;
    };
};
export interface UiFileUploadEmits {
    error: [UiFileUploadError];
    'upload-click': [];
    upload: [file: File];
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiFileUploadProps & {
    file?: File | null;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (args_0: UiFileUploadError) => any;
    "update:file": (value: File | null) => any;
    "upload-click": () => any;
    upload: (file: File) => any;
}, string, import("vue").PublicProps, Readonly<UiFileUploadProps & {
    file?: File | null;
}> & Readonly<{
    onError?: ((args_0: UiFileUploadError) => any) | undefined;
    "onUpdate:file"?: ((value: File | null) => any) | undefined;
    "onUpload-click"?: (() => any) | undefined;
    onUpload?: ((file: File) => any) | undefined;
}>, {
    disabled: boolean;
    ui: UiProp<FileUploadUi>;
    formats: string[];
    maxSizeBytes: number;
    allowUpload: boolean;
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
