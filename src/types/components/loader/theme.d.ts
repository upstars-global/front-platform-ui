declare const loader: {
    base: string;
    svg: string;
    circle: string;
    states: {
        centered: string;
    };
};
export type LoaderUi = typeof loader;
export default loader;
