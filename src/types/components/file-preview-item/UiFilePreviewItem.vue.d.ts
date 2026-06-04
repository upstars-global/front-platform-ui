import type { UiProp } from '../../components/types';
import type { FilePreviewItemUi } from './theme';
import type { UiIconName } from '../icon/config';
export interface UiFilePreviewItemProps {
    file: File;
    ui?: UiProp<FilePreviewItemUi>;
    dataTest?: string;
    removeIconName?: UiIconName;
}
export interface UiFilePreviewItemEmits {
    remove: [];
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiFilePreviewItemProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    remove: () => any;
}, string, import("vue").PublicProps, Readonly<UiFilePreviewItemProps> & Readonly<{
    onRemove?: (() => any) | undefined;
}>, {
    ui: UiProp<FilePreviewItemUi>;
    dataTest: string;
    removeIconName: UiIconName;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    'remove-icon'?: (props: {}) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
