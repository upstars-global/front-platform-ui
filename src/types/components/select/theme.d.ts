declare const select: {
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
    states: {
        disabled: string;
        full: string;
        max: string;
    };
};
export type SelectUi = typeof select;
export default select;
