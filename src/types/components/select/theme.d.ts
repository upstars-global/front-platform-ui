import type { TooltipUi } from '../tooltip/theme';
import type { UiProp } from '../types';
export type SelectUi = {
    base: string;
    label: string;
    container: string;
    select: {
        base: string;
        sizeSmall: string;
        sizeMedium: string;
        textAlignRight: string;
        textAlignCenter: string;
        leftSlot: string;
        invalid: string;
    };
    leftSlot: string;
    dropdownIcon: string;
    error: {
        content: string;
        text: string;
    };
    description: string;
    tooltip?: UiProp<TooltipUi>;
    states: {
        disabled: string;
        full: string;
        max: string;
    };
};
declare const select: SelectUi;
export default select;
