declare const stepper: {
    base: string;
    step: {
        base: string;
        active: string;
        inactive: string;
    };
};
export type StepperUi = typeof stepper;
export default stepper;
