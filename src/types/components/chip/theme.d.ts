declare const chip: {
    base: string;
    states: {
        active: string;
        special: string;
    };
    carousel: {
        base: string;
        item: string;
    };
    group: {
        base: string;
        item: string;
    };
};
export type ChipUi = typeof chip;
export default chip;
