import type { PictureProvider } from '../components/types';
type Setup = PictureProvider | (() => PictureProvider);
export declare function definePictureProvider(setup: Setup): () => PictureProvider;
export {};
