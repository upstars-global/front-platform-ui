import type { UiIcons } from './icon/config';
import type { BadgeUi } from './badge/theme';
import type { ButtonUi } from './button/theme';
import type { CarouselUi } from './carousel/theme';
import type { CheckboxUi } from './checkbox/theme';
import type { CircleProgressBarUi } from './circle-progress-bar/theme';
import type { LinkUi } from './link/theme';
import type { MenuUi } from './menu/theme';
import type { SkeletonUi } from './skeleton/theme';
export type Strategy = 'join' | 'merge';
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined;
};
export type UiProp<T> = DeepPartial<T> & {
    strategy?: Strategy;
};
interface UiConfig {
    badge?: UiProp<BadgeUi>;
    button?: UiProp<ButtonUi>;
    carousel?: UiProp<CarouselUi>;
    checkbox?: UiProp<CheckboxUi>;
    circleProgressBar?: UiProp<CircleProgressBarUi>;
    icon?: {
        strategy?: Strategy;
    };
    link?: UiProp<LinkUi>;
    menu?: UiProp<MenuUi>;
    skeleton?: UiProp<SkeletonUi>;
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
