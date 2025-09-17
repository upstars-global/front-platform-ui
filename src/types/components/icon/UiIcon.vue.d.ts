import type { UiIconName } from './config';
type IconSize = '16' | '20' | '24' | '32' | '40' | '48' | 'full';
export interface UiIconProps {
    name?: UiIconName;
    src?: string;
    size?: IconSize;
}
declare const _default: import("vue").DefineComponent<UiIconProps, void, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiIconProps> & Readonly<{}>, {
    name: UiIconName;
    size: IconSize;
    src: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
