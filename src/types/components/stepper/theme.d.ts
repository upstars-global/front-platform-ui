declare const stepper: {
    base: string;
    states: {
        base: string;
        completed: string;
        active: string;
        inactive: string;
    };
};
export type StepperUi = typeof stepper;
export default stepper;
