import { inject } from 'vue'
import type { AppConfig } from '../components/types'

export const AppConfigSymbol = 'fpUiKitConfig'

export function useAppConfig() {
  const config = inject(AppConfigSymbol) as AppConfig

  if (!config) {
    throw new Error('[front-platform-ui]: plugin is not installed!')
  }

  return config
}
