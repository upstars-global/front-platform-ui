import type { UiProp } from '../types';
import type { TabUi, TabsUi } from '../tabs/theme';
import type { UiTabProps } from './UiTab.vue';
export interface UiTabsProps {
    id: string;
    items: UiTabProps[];
    ui?: UiProp<TabsUi>;
}
export interface UiTabsEmits {
    (event: 'update:activeTab', value: UiTabProps['id']): void;
}
export interface UiTabsSlots {
    item(props: {
        item: UiTabProps;
        ui: TabUi;
    }): unknown;
    content(props: {
        item: UiTabProps;
    }): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiTabsProps & {
    activeTab: UiTabProps["id"];
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:activeTab": (value: string) => any;
} & {
    "update:activeTab": (value: string) => any;
}, string, import("vue").PublicProps, Readonly<UiTabsProps & {
    activeTab: UiTabProps["id"];
}> & Readonly<{
    "onUpdate:activeTab"?: ((value: string) => any) | undefined;
}>, {
    ui: UiProp<TabsUi>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiTabsSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
