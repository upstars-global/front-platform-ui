interface ObserverParams {
    target: Element;
    callback: MutationCallback;
    handleAttributes?: boolean;
    deep?: boolean;
}
export declare function observeContentChanged(params: ObserverParams): () => void;
export {};
