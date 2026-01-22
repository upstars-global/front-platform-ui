import type { UiProp } from '../types';
import type { ModalUi } from './theme';
type ModalRole = 'dialog' | 'alertdialog';
export interface UiModalProps {
    title?: string;
    description?: string;
    showCloseButton?: boolean;
    fullscreen?: boolean;
    role?: ModalRole;
    isLoaded?: boolean;
    isCustomScroll?: boolean;
    infiniteScroll?: boolean;
    infiniteScrollMargin?: number;
    ui?: UiProp<ModalUi>;
}
export interface UiModalEmits {
    (event: 'close'): void;
    (event: 'infiniteScroll'): void;
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
    infiniteScroll: () => any;
}, string, import("vue").PublicProps, Readonly<UiModalProps> & Readonly<{
    onClose?: (() => any) | undefined;
    onInfiniteScroll?: (() => any) | undefined;
}>, {
    description: string;
    title: string;
    role: ModalRole;
    fullscreen: boolean;
    ui: UiProp<ModalUi>;
    infiniteScroll: boolean;
    infiniteScrollMargin: number;
    showCloseButton: boolean;
    isLoaded: boolean;
    isCustomScroll: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiModalSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
