declare const card: {
    base: string;
    rounded: string;
    variants: {
        default: string;
        outline: string;
        soft: string;
        subtle: string;
    };
    orientation: {
        vertical: string;
        horizontal: string;
    };
};
export type CardUi = typeof card;
export default card;
