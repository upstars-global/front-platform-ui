declare const circleProgressBar: {
    base: string;
    svg: string;
    content: string;
    progress: {
        trail: string;
        line: string;
    };
};
export type CircleProgressBarUi = typeof circleProgressBar;
export default circleProgressBar;
