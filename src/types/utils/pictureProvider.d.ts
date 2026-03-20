interface ResolvedPicture {
    url: string;
    sourceList?: Array<{
        srcset: string;
        media: string;
    }>;
}
export interface PictureProvider<T> {
    getPicture: (properties: T) => ResolvedPicture;
}
export declare function definePictureProvider<T>(setup: PictureProvider<T> | (() => PictureProvider<T>)): () => PictureProvider<T>;
export {};
