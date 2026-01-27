declare const progressBar: {
    base: string;
    progress: {
        content: string;
        trail: string;
        line: string;
    };
    size: {
        sm: string;
        md: string;
    };
};
export type ProgressBarUi = typeof progressBar;
export default progressBar;
