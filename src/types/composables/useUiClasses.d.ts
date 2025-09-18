import { type ComputedRef } from 'vue';
import { type ClassNameValue } from 'tailwind-merge';
import type { Strategy } from '../components/types';
export declare function useComponentAttributes(rootClassName: ClassNameValue, baseClasses?: ComputedRef<ClassNameValue>, strategy?: Strategy): {
    attributes: ComputedRef<{
        [x: string]: unknown;
    }>;
    className: ComputedRef<string>;
};
