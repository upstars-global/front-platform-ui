import type { Plugin } from 'vue'
import type { AppConfig } from '../components/types'
import type { UiPictureProps } from '../components/picture/UiPicture.vue'
import { defu } from 'defu'
import { AppConfigSymbol } from '../composables/useAppConfig'
import { icons } from '../components/icon/config'
import { definePictureProvider } from '../utils/pictureProvider'

const plugin: Plugin<AppConfig> = {
  install: (app, options) => {
    const config: AppConfig = {
      ...options,
      icons: defu(options?.icons ?? {}, icons),
      providers: defu(options?.providers ?? {}, {
        picture: {
          default: definePictureProvider<UiPictureProps>({
            getPicture: ({ src, sources }) => ({ url: src, sourceList: sources })
          })
        }
      })
    }

    app.provide(AppConfigSymbol, config)

    return config
  }
}

export default plugin
