import type { UiProp } from '../types';
import type { ChipUi } from './theme';
import type { UiIconName } from '../icon/config';
import type { IconSize } from '../icon/UiIcon.vue';
export interface UiChipProps<T = string | number> {
    label: string;
    name: T;
    dataTest?: string;
    isHidden?: boolean;
    isSpecial?: boolean;
    isActive?: boolean;
    count?: number;
    leadingIconName?: UiIconName;
    leadingIconSize?: IconSize;
    trailingIconName?: UiIconName;
    trailingIconSize?: IconSize;
    ui?: UiProp<ChipUi>;
}
export interface UiChipEmits {
    (event: 'click', value: MouseEvent): void;
    (event: 'click-leading', value: MouseEvent): void;
    (event: 'click-trailing', value: MouseEvent): void;
}
export interface UiChipSlots {
    leading(): unknown;
    trailing(): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiChipProps<string | number>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (value: MouseEvent) => any;
    "click-leading": (value: MouseEvent) => any;
    "click-trailing": (value: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<UiChipProps<string | number>> & Readonly<{
    onClick?: ((value: MouseEvent) => any) | undefined;
    "onClick-leading"?: ((value: MouseEvent) => any) | undefined;
    "onClick-trailing"?: ((value: MouseEvent) => any) | undefined;
}>, {
    ui: UiProp<ChipUi>;
    trailingIconName: UiIconName;
    trailingIconSize: IconSize;
    dataTest: string;
    leadingIconName: UiIconName;
    leadingIconSize: IconSize;
    count: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiChipSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
