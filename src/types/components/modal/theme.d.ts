declare const modal: {
    base: string;
    states: {
        default: string;
        fullscreen: string;
    };
    header: string;
    title: string;
    description: string;
    closeButton: string;
    closeIcon: string;
    content: string;
    footer: string;
};
export type ModalUi = typeof modal;
export default modal;
