import type { TimerUi } from '../timer/theme';
declare const badgeTimer: {
    base: string;
    label: string;
    size: {
        sm: string;
        md: string;
    };
    variants: {
        default: string;
        outline: string;
        soft: string;
    };
    states: {
        default: string;
        cropped: string;
    };
    indicator: {
        base: string;
        variants: {
            info: string;
            error: string;
            success: string;
            warning: string;
        };
    };
    timer: TimerUi;
};
export type BadgeTimerUi = typeof badgeTimer;
export default badgeTimer;
