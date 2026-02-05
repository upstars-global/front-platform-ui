import type { UiProp } from '../types';
declare const tabs: {
    base: string;
    container: string;
    content: string;
    item: {
        base: string;
        active: string;
        disabled: string;
        leadingIcon: string;
        trailingIcon: string;
    };
};
export type TabsUi = typeof tabs;
export type TabUi = UiProp<typeof tabs.item>;
export default tabs;
