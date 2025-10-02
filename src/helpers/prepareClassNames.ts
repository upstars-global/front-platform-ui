import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../components/types'

type Params<T> = {
  theme: T
  appConfig?: UiProp<T>
  uiProp?: UiProp<T>
}

function collectClassNames(value: string, appConfigValue?: string, uiPropValue?: string) {
  return [value, appConfigValue, uiPropValue].filter(Boolean)
}

export function prepareVariants<T extends Record<string, unknown>>({ theme, appConfig, uiProp }: Params<T>) {
  return Object.entries(theme).reduce(
    (result, [key, value]) => {
      if (typeof value === 'string') {
        result[key] = collectClassNames(value, appConfig?.[key] as string, uiProp?.[key] as string)
      }

      return result
    },
    {} as Record<string, ClassNameValue[]>
  )
}
