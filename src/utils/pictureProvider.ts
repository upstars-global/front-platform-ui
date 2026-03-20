interface ResolvedPicture {
  url: string
  sourceList?: Array<{ srcset: string; media: string }>
}

export interface PictureProvider<T> {
  getPicture: (properties: T) => ResolvedPicture
}

export function definePictureProvider<T>(
  setup: PictureProvider<T> | (() => PictureProvider<T>)
): () => PictureProvider<T> {
  let result: PictureProvider<T>

  return () => {
    if (result) {
      return result
    }
    result = typeof setup === 'function' ? setup() : setup
    return result
  }
}
