import type { UiProp } from '../types';
import type { UiIconName } from '../icon/config';
import type { IconSize } from '../icon/UiIcon.vue';
import type { AccordionUi } from './theme';
export interface UiAccordionProps {
    isOpen?: boolean;
    isCustomToggle?: boolean;
    trailingIconName?: UiIconName;
    trailingIconSize?: IconSize;
    ui?: UiProp<AccordionUi>;
}
export interface UiAccordionSlots {
    activator(props: {
        toggleHandler: () => void;
        showContent: boolean;
    }): unknown;
    default(props: {
        toggleHandler: () => void;
    }): unknown;
    trailing(): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiAccordionProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiAccordionProps> & Readonly<{}>, {
    ui: UiProp<AccordionUi>;
    trailingIconName: UiIconName;
    trailingIconSize: IconSize;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiAccordionSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
