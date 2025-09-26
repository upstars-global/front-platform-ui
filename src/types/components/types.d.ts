import type { UiIcons } from './icon/config';
import type { ButtonUi } from './button/theme';
import type { CheckboxUi } from './checkbox/theme';
import type { CircleProgressBarUi } from './circle-progress-bar/theme';
import type { LinkUi } from './link/theme';
export type Strategy = 'join' | 'merge';
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined;
};
export type UiProp<T> = DeepPartial<T> & {
    strategy?: Strategy;
};
interface UiConfig {
    button?: UiProp<ButtonUi>;
    checkbox?: UiProp<CheckboxUi>;
    circleProgressBar?: UiProp<CircleProgressBarUi>;
    icon?: {
        strategy?: Strategy;
    };
    link?: UiProp<LinkUi>;
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
