declare const button: {
    base: string;
    size: {
        default: string;
        xs: string;
        sm: string;
        md: string;
    };
    variants: {
        default: string;
        primary: string;
        secondary: string;
        tertiary: string;
        ghost: string;
    };
    active: {
        default: string;
        primary: string;
        secondary: string;
        tertiary: string;
        ghost: string;
    };
    states: {
        disabled: string;
        full: string;
    };
    leadingIcon: string;
    trailingIcon: string;
};
export type ButtonUi = typeof button;
export default button;
