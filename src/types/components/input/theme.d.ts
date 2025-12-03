import type { TooltipUi } from '../tooltip/theme';
import type { UiProp } from '../types';
export type InputUi = {
    base: string;
    label: string;
    container: string;
    input: {
        base: string;
        textAlignRight: string;
        textAlignCenter: string;
        leftSlot: string;
        rightSlot: string;
        disabled: string;
        invalid: string;
        recommendations: string;
    };
    leftSlot: string;
    rightSlot: string;
    recommendationsContainer: string;
    recommendationsList: string;
    recommendationsListItem: string;
    error: {
        content: string;
        text: string;
    };
    description: string;
    tooltip?: UiProp<TooltipUi>;
    states: {
        disabled: string;
    };
};
declare const input: InputUi;
export default input;
