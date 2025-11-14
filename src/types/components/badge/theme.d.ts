declare const badge: {
    base: string;
    size: {
        default: string;
        sm: string;
        md: string;
    };
    variants: {
        default: string;
        cropped: string;
        counter: string;
    };
    leadingIcon: string;
    trailingIcon: string;
};
export type BadgeUi = typeof badge;
export default badge;
