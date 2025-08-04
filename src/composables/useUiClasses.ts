import { computed, useAttrs, type ComputedRef, type Ref } from 'vue'
import { twMerge } from 'tailwind-merge'

type ExtraClasses = string | string[] | Ref<string | string[]> | ComputedRef<string | string[]>

export function useComponentAttributes(rootClassName: string, extraClasses?: ExtraClasses) {
  const attrs = useAttrs()

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
    if (Array.isArray(extraClasses) || typeof extraClasses === 'string') {
      return twMerge(rootClassName, extraClasses, classes.value)
    }
    return twMerge(rootClassName, extraClasses?.value, classes.value)
  })

  return { attributes, className }
}
