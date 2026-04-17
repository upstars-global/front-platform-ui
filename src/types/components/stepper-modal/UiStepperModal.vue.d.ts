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
    back: (step: number) => any;
    close: () => any;
}, string, import("vue").PublicProps, Readonly<UiStepperModalProps> & Readonly<{
    onBack?: ((step: number) => any) | undefined;
    onClose?: (() => any) | undefined;
}>, {
    title: string;
    role: "dialog" | "alertdialog";
    description: string;
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
