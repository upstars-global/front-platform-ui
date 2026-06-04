declare const fileUpload: {
    base: string;
    container: string;
    description: string;
    states: {
        disabled: string;
    };
};
export type FileUploadUi = typeof fileUpload;
export default fileUpload;
