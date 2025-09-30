import type { UiProp } from '../types';
import type { SkeletonUi } from './theme';
export interface UiSkeletonProps {
    as?: string;
    ui?: UiProp<SkeletonUi>;
}
export interface UiSkeletonSlots {
    default(): unknown;
}
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<UiSkeletonProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<UiSkeletonProps> & Readonly<{}>, {
    as: string;
    ui: UiProp<SkeletonUi>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, UiSkeletonSlots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
