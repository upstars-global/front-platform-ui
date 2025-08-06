import { type ComputedRef, type Ref } from 'vue';
type ExtraClasses = string | string[] | Ref<string | string[]> | ComputedRef<string | string[]>;
export declare function useComponentAttributes(rootClassName: string, extraClasses?: ExtraClasses): {
    attributes: ComputedRef<{
        [x: string]: unknown;
    }>;
    className: ComputedRef<string>;
};
export {};
