import { computed, useAttrs, type ComputedRef } from 'vue'
import { twJoin, type ClassNameValue, extendTailwindMerge } from 'tailwind-merge'
import type { Strategy } from '../components/types'

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      rounded: [
        'rounded-none',
        'rounded-0',
        'rounded-0.5',
        'rounded-1',
        'rounded-1.5',
        'rounded-2',
        'rounded-3',
        'rounded-4',
        'rounded-5',
        'rounded-6',
        'rounded-7',
        'rounded-7',
        'rounded-full'
      ],
      'font-size': [
        'text-base',
        'text-copy',
        'text-copy-l',
        'text-caption-l',
        'text-caption-m',
        'text-caption-s',
        'text-pin',
        'text-large',
        'text-h1',
        'text-h2',
        'text-h3',
        'text-h4'
      ]
    }
  }
})

export function useComponentAttributes(
  rootClassName: ClassNameValue,
  baseClasses?: ComputedRef<ClassNameValue>,
  strategy: Strategy = 'join'
) {
  const attrs = useAttrs()

  function mergeClasses(...classList: ClassNameValue[]) {
    const mergeFn = strategy === 'merge' ? customTwMerge : twJoin

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
