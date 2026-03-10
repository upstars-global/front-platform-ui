import type { PictureProvider } from '../components/types'

type Setup = PictureProvider | (() => PictureProvider)

export function definePictureProvider(setup: Setup): () => PictureProvider {
  let result: PictureProvider

  return () => {
    if (result) {
      return result
    }
    result = typeof setup === 'function' ? setup() : setup
    return result
  }
}
