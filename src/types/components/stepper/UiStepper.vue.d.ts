import type { StepperUi } from './theme';
import type { UiProp } from '../types';
export interface UiStepperProps {
    currentStep?: number;
    size?: number;
    ui?: UiProp<StepperUi>;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<UiStepperProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiStepperProps> & Readonly<{}>, {
    currentStep: number;
    size: number;
    ui: UiProp<StepperUi>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
