import type { UiProp } from '../types';
import type { ChipUi } from './theme';
export interface UiChipProps<T = string | number> {
    label: string;
    name: T;
    dataTest?: string;
    isHidden?: boolean;
    isSpecial?: boolean;
    isActive?: boolean;
    count?: number;
    ui?: UiProp<ChipUi>;
}
export interface UiChipEmits {
    (event: 'click', value: MouseEvent): void;
}
export interface UiChipSlots {
    trailing(): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiChipProps<string | number>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (value: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<UiChipProps<string | number>> & Readonly<{
    onClick?: ((value: MouseEvent) => any) | undefined;
}>, {
    ui: UiProp<ChipUi>;
    dataTest: string;
    count: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiChipSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
