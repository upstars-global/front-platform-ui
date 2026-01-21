import type { ModalItem } from '../types';
interface ModalWrapperProps {
    modal: ModalItem;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<ModalWrapperProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    close: (name: string) => any;
    "modal-open": (modal: ModalItem) => any;
    "modal-close": (modal: ModalItem) => any;
}, string, import("vue").PublicProps, Readonly<ModalWrapperProps> & Readonly<{
    onClose?: ((name: string) => any) | undefined;
    "onModal-open"?: ((modal: ModalItem) => any) | undefined;
    "onModal-close"?: ((modal: ModalItem) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
