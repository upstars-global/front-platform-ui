import type { UiProp } from '../../types.ts';
import type { ModalRendererUi } from '../theme.ts';
import type { ModalItem } from '../types.ts';
export interface ModalRendererProps {
    modals: ModalItem[];
    isVisible?: boolean;
    isMobile?: boolean;
    ui?: UiProp<ModalRendererUi>;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<ModalRendererProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    close: (name: string) => any;
    "modal-open": (modal: ModalItem) => any;
    "modal-close": (modal: ModalItem) => any;
}, string, import("vue").PublicProps, Readonly<ModalRendererProps> & Readonly<{
    onClose?: ((name: string) => any) | undefined;
    "onModal-open"?: ((modal: ModalItem) => any) | undefined;
    "onModal-close"?: ((modal: ModalItem) => any) | undefined;
}>, {
    isVisible: boolean;
    isMobile: boolean;
    ui: UiProp<ModalRendererUi>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
