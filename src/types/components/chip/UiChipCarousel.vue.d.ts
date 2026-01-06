import type { UiProp } from '../types';
import type { UiChipProps } from './UiChip.vue';
import type { ChipUi } from './theme';
declare const __VLS_export: <T extends string | number>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<({
        items: UiChipProps<T>[];
        ui?: UiProp<ChipUi>;
    } & {
        modelValue: T;
    }) & {
        "onUpdate:modelValue"?: ((value: T) => any) | undefined;
    }> & import("vue").PublicProps & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {};
    emit: ((event: "update:modelValue", ...args: any[]) => void) & ((evt: "update:modelValue", value: T) => void);
}>) => import("vue").VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_PrettifyLocal<T> = (T extends any ? {
    [K in keyof T]: T[K];
} : {
    [K in keyof T as K]: T[K];
}) & {};
