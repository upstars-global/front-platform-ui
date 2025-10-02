import type { ClassNameValue } from 'tailwind-merge';
import type { UiProp } from '../components/types';
type Params<T> = {
    theme: T;
    appConfig?: UiProp<T>;
    uiProp?: UiProp<T>;
};
export declare function prepareVariants<T extends Record<string, unknown>>({ theme, appConfig, uiProp }: Params<T>): Record<string, ClassNameValue[]>;
export {};
