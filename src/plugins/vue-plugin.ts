import type { Plugin } from 'vue'
import type { AppConfig } from '../components/types'
import { AppConfigSymbol } from '../config/injectionKeys'

const plugin: Plugin<AppConfig> = {
  install: (app, options) => {
    const config: AppConfig = {
      ...options
    }

    app.provide(AppConfigSymbol, config)

    return config
  }
}

export default plugin
