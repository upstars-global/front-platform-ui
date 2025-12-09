import type { Decorator } from '@storybook/vue3-vite'
import { h } from 'vue'

const UPDATE_PREFIX = 'update:'

const formatValue = (value: unknown, inputType?: unknown): unknown => {
  if (inputType === 'number' && typeof value === 'string') {
    const num = Number(value)
    return isNaN(num) ? value : num
  }

  return value
}

export const argsUpdater: Decorator = (story, context) => ({
  setup(_, { attrs }) {
    const emits = context.component?.emits ?? []
    const updateEmits = emits.filter((name: string) => name.startsWith(UPDATE_PREFIX))

    const listeners: Record<string, (value: unknown) => void> = {}

    for (const name of updateEmits) {
      const propName = name.slice(UPDATE_PREFIX.length)
      const camelCasePropName = propName.replace(/-([a-z])/g, (_: string, letter: string) => letter.toUpperCase())
      const eventName = `onUpdate:${propName}`

      listeners[eventName] = (value: unknown) => {
        const formattedValue = formatValue(value, context.args?.type)
        context.updateArgs?.({ [camelCasePropName]: formattedValue })
      }
    }

    return () => h(story(), { ...attrs, ...listeners })
  }
})
