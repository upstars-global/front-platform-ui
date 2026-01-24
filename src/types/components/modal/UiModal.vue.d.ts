import type { UiProp } from '../types';
import type { ModalUi } from './theme';
export type ModalRole = 'dialog' | 'alertdialog';
export interface UiModalProps {
    title?: string;
    description?: string;
    showCloseButton?: boolean;
    fullscreen?: boolean;
    role?: ModalRole;
    ui?: UiProp<ModalUi>;
}
export interface UiModalEmits {
    (event: 'close'): void;
}
export interface UiModalSlots {
    header(props: {
        close: () => void;
    }): unknown;
    default(): unknown;
    footer(props: {
        close: () => void;
    }): unknown;
    close(props: {
        close: () => void;
    }): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiModalProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    close: () => any;
}, string, import("vue").PublicProps, Readonly<UiModalProps> & Readonly<{
    onClose?: (() => any) | undefined;
}>, {
    title: string;
    role: ModalRole;
    description: string;
    fullscreen: boolean;
    ui: UiProp<ModalUi>;
    showCloseButton: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiModalSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
