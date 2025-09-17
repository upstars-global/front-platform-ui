import { inject } from 'vue'
import { AppConfigSymbol } from '../config/injectionKeys'

export function useAppConfig() {
  const config = inject(AppConfigSymbol)

  if (!config) {
    throw new Error('[front-platform-ui]: plugin is not installed!')
  }

  return config
}
