import { computed, useAttrs, type ComputedRef } from 'vue'
import { twMerge, twJoin, type ClassNameValue } from 'tailwind-merge'
import type { Strategy } from '../components/types'

export function useComponentAttributes(
  rootClassName: ClassNameValue,
  baseClasses?: ComputedRef<ClassNameValue>,
  strategy: Strategy = 'join'
) {
  const attrs = useAttrs()

  function mergeClasses(...classList: ClassNameValue[]) {
    const mergeFn = strategy === 'merge' ? twMerge : twJoin

    return mergeFn(classList)
  }

  const attributes = computed(() => {
    const result = { ...attrs }
    delete result.class
    return result
  })

  const classes = computed(() => {
    let str = ''

    if (!attrs.class) {
      return str
    }

    if (Array.isArray(attrs.class)) {
      str = attrs.class.join(' ')
    } else if (typeof attrs.class === 'object') {
      str = Object.keys(attrs.class)
        .filter((key) => (attrs.class as Record<string, unknown>)[key])
        .join(' ')
    }

    return str || (attrs.class as string)
  })

  const className = computed(() => {
    return mergeClasses(rootClassName, baseClasses?.value, classes.value)
  })

  return { attributes, className, mergeClasses }
}
