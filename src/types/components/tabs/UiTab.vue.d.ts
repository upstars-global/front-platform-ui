import type { IconSize } from '../icon/UiIcon.vue';
import type { UiIconName } from '../icon/config';
import type { TabUi } from './theme';
export interface UiTabProps {
    id: string;
    label: string;
    leadingIconName?: UiIconName;
    leadingIconSize?: IconSize;
    trailingIconName?: UiIconName;
    trailingIconSize?: IconSize;
    isActive?: boolean;
    isDisabled?: boolean;
    ui?: TabUi;
}
interface UiTabSlots {
    default(): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiTabProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (value: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<UiTabProps> & Readonly<{
    onClick?: ((value: MouseEvent) => any) | undefined;
}>, {
    ui: TabUi;
    trailingIconName: UiIconName;
    trailingIconSize: IconSize;
    leadingIconName: UiIconName;
    leadingIconSize: IconSize;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiTabSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
