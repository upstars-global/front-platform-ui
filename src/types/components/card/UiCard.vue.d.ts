import type { UiProp } from '../types';
import type { CardUi } from './theme';
export interface UiCardProps {
    as?: string;
    isRounded?: boolean;
    isReverse?: boolean;
    orientation?: 'vertical' | 'horizontal';
    variant?: 'default' | 'outline' | 'soft' | 'subtle';
    ui?: UiProp<CardUi>;
}
export interface UiCardSlots {
    header(): unknown;
    default(): unknown;
    body(): unknown;
    footer(): unknown;
}
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiCardProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiCardProps> & Readonly<{}>, {
    variant: "default" | "outline" | "soft" | "subtle";
    orientation: "vertical" | "horizontal";
    as: string;
    ui: UiProp<CardUi>;
    isRounded: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiCardSlots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
