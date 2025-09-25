declare const checkbox: {
    base: string;
    input: string;
    container: string;
    checkmark: {
        container: string;
        inner: string;
        checked: string;
        invalid: string;
    };
    error: string;
    states: {
        disabled: string;
    };
};
export type CheckboxUi = typeof checkbox;
export default checkbox;
