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
declare const __VLS_export: import("vue").DefineComponent<ModalRendererProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    [x: string]: ((...args: unknown[]) => any) | (() => any);
} | ({
    [x: string]: ((...args: unknown[]) => any) | (() => any);
} & {
    [x: string]: any;
}), string, import("vue").PublicProps, Readonly<ModalRendererProps> & Readonly<{
    [x: `on${Capitalize<string>}`]: ((...args: unknown[] & []) => any) | undefined;
} | {
    [x: `on${Capitalize<any>}`]: ((...args: any) => any) | undefined;
}>, {
    ui: UiProp<ModalRendererUi>;
    isVisible: boolean;
    isMobile: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
