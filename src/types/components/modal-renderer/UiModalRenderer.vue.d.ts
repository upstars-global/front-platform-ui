import type { UiProp } from '../types';
import type { ModalRendererUi } from './theme';
import type { ModalItem } from './types';
export interface UiModalRendererProps {
    modals: ModalItem[];
    isVisible?: boolean;
    isMobile?: boolean;
    ui?: UiProp<ModalRendererUi>;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<UiModalRendererProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    close: (name: string) => any;
    "modal-open": (modal: ModalItem) => any;
    "modal-close": (modal: ModalItem) => any;
}, string, import("vue").PublicProps, Readonly<UiModalRendererProps> & Readonly<{
    onClose?: ((name: string) => any) | undefined;
    "onModal-open"?: ((modal: ModalItem) => any) | undefined;
    "onModal-close"?: ((modal: ModalItem) => any) | undefined;
}>, {
    ui: UiProp<ModalRendererUi>;
    isMobile: boolean;
    isVisible: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
