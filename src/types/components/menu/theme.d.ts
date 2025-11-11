declare const menu: {
    base: string;
    item: {
        base: string;
        active: string;
    };
};
export type MenuUi = typeof menu;
export default menu;
