import type { UiIconName } from './config';
import type { Strategy } from '../types';
export type IconSize = '16' | '20' | '24' | '32' | '40' | '48' | 'full';
export interface UiIconProps {
    name?: UiIconName;
    src?: string;
    size?: IconSize;
    ui?: {
        strategy?: Strategy;
    };
}
declare const __VLS_export: import("vue").DefineComponent<UiIconProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiIconProps> & Readonly<{}>, {
    name: UiIconName;
    src: string;
    size: IconSize;
    ui: {
        strategy?: Strategy;
    };
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
