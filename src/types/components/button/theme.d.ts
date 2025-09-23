declare const button: {
    base: string;
    size: {
        default: string;
        sm: string;
        md: string;
        lg: string;
    };
    variants: {
        default: string;
        primary: string;
        secondary: string;
        tertiary: string;
    };
    states: {
        disabled: string;
        full: string;
    };
};
export type ButtonUi = typeof button;
export default button;
