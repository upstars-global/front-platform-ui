import type { IconName } from './config';
type IconSize = '16' | '20' | '24' | '32' | '40' | '48' | 'full';
export interface IconProps {
    name?: IconName;
    src?: string;
    size?: IconSize;
}
declare const _default: import("vue").DefineComponent<IconProps, void, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<IconProps> & Readonly<{}>, {
    size: IconSize;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
