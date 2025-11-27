import type { Placement, Strategy } from '@floating-ui/vue';
import type { UiProp } from '../types';
import type { TooltipUi } from './theme';
export interface UiTooltipProps {
    text?: string;
    placement?: Placement;
    strategy?: Strategy;
    fallbackPlacements?: Placement[];
    offsetValue?: number;
    disabled?: boolean;
    trigger?: 'hover' | 'click' | 'always';
    ui?: UiProp<TooltipUi>;
}
export interface UiTooltipSlots {
    activator?: () => unknown;
    default?: () => unknown;
}
type __VLS_Slots = UiTooltipSlots;
declare const __VLS_base: import("vue").DefineComponent<UiTooltipProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiTooltipProps> & Readonly<{}>, {
    offsetValue: number;
    text: string;
    ui: UiProp<TooltipUi>;
    disabled: boolean;
    placement: Placement;
    strategy: Strategy;
    fallbackPlacements: Placement[];
    trigger: "hover" | "click" | "always";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
