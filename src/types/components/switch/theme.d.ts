declare const switchTheme: {
    base: string;
    input: string;
    checkmark: {
        base: string;
        size: {
            sm: string;
            md: string;
            lg: string;
        };
    };
    checked: string;
    states: {
        disabled: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
};
export type SwitchUi = typeof switchTheme;
export default switchTheme;
