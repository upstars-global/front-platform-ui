import type { UiIcons } from './icon/config';
import type { LinkUi } from './link/theme';
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined;
};
interface UiConfig {
    link?: DeepPartial<LinkUi>;
}
export interface AppConfig {
    icons?: UiIcons;
    ui?: UiConfig;
}
export interface FormElementProps {
    name: string;
    label?: string;
    disabled?: boolean;
    form?: string;
    required?: boolean;
}
export {};
