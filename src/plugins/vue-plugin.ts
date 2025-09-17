import type { Plugin } from 'vue'
import type { AppConfig } from '../components/types'
import { defu } from 'defu'
import { AppConfigSymbol } from '../composables/useAppConfig'
import { icons } from '../components/icon/config'

const plugin: Plugin<AppConfig> = {
  install: (app, options) => {
    const config: AppConfig = {
      ...options,
      icons: defu(options?.icons ?? {}, icons)
    }

    app.provide(AppConfigSymbol, config)

    return config
  }
}

export default plugin
