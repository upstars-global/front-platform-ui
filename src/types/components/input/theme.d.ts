declare const input: {
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
    states: {
        disabled: string;
    };
};
export type InputUi = typeof input;
export default input;
