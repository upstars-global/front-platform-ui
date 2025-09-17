import type { InjectionKey } from 'vue'
import type { AppConfig } from '../components/types'

export const AppConfigSymbol = Symbol() as InjectionKey<AppConfig>
