import type { Decorator } from '@storybook/vue3-vite'
import { h, ref } from 'vue'
import { action, type HandlerFunction } from 'storybook/actions'

export const emitsObserver: Decorator = (story, context) => ({
  setup(_, { attrs }) {
    let emits: string[] = []
    if (context.component?.emits) {
      emits = context.component.emits
    }
    const listeners = ref<Record<string, HandlerFunction>>({})

    emits.forEach((name) => {
      listeners.value[name] = action(name)
    })

    return () => h(story(), { ...attrs, listeners: listeners.value })
  }
})
