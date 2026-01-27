import type { Decorator } from '@storybook/vue3-vite'
import { h, ref } from 'vue'
import { action, type HandlerFunction } from 'storybook/actions'

/**
 * Storybook decorator that automatically tracks component emits
 * and displays them in the Actions panel.
 *
 * Reads the `emits` option from the component and creates action listeners
 * for each emitted event (e.g., `close` → `onClose`).
 *
 * @note If your component has wrapper in the component's stories, then `emitsObserver` won't work properly.
 * For details check README.md.
 */
export const emitsObserver: Decorator = (story, context) => ({
  setup(_, { attrs }) {
    let emits: string[] = []
    if (context.component?.emits) {
      emits = context.component.emits
    }
    const listeners = ref<Record<string, HandlerFunction>>({})

    emits.forEach((name) => {
      const eventName = `on${name.charAt(0).toUpperCase() + name.slice(1)}`
      listeners.value[eventName] = action(name)
    })

    return () => h(story(), { ...attrs, ...listeners.value })
  }
})
