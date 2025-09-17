import { type ComputedRef } from 'vue';
import { type ClassNameValue } from 'tailwind-merge';
export declare function useComponentAttributes(rootClassName: ClassNameValue, baseClasses?: ComputedRef<ClassNameValue>): {
    attributes: ComputedRef<{
        [x: string]: unknown;
    }>;
    className: ComputedRef<string>;
};
