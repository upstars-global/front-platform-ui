import type { UiProp } from '../types';
import type { StepperModalUi } from './theme';
import type { UiModalProps } from '../modal/UiModal.vue';
export interface UiStepperModalProps extends Omit<UiModalProps, 'ui'> {
    currentStep?: number;
    totalSteps?: number;
    hideProgress?: boolean;
    hideBackButton?: boolean;
    ui?: UiProp<StepperModalUi>;
}
export interface UiStepperModalEmits {
    (event: 'close'): void;
    (event: 'back', step: number): void;
}
export interface UiStepperModalSlots {
    default(props: {
        close: () => void;
    }): unknown;
    footer(props: {
        close: () => void;
    }): unknown;
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<UiStepperModalProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    close: () => any;
    back: (step: number) => any;
}, string, import("vue").PublicProps, Readonly<UiStepperModalProps> & Readonly<{
    onClose?: (() => any) | undefined;
    onBack?: ((step: number) => any) | undefined;
}>, {
    description: string;
    title: string;
    role: "dialog" | "alertdialog";
    fullscreen: boolean;
    ui: UiProp<StepperModalUi>;
    showCloseButton: boolean;
    currentStep: number;
    totalSteps: number;
    hideProgress: boolean;
    hideBackButton: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiStepperModalSlots>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
