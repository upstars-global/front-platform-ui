import type { UiProp } from '../types';
import type { LoaderUi } from './theme';
export interface UiLoaderProps {
    duration?: number;
    size?: number;
    strokeWidth?: number;
    rounded?: boolean;
    ui?: UiProp<LoaderUi>;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<UiLoaderProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiLoaderProps> & Readonly<{}>, {
    strokeWidth: number;
    size: number;
    duration: number;
    ui: UiProp<LoaderUi>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
