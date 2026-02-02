import type { Decorator } from '@storybook/vue3-vite'

export const fullScreenOverlay: Decorator = (_story, context) => ({
  setup() {
    const classes = ['inset-0 flex items-end md:items-center justify-center bg-black/50']
    if (context.viewMode === 'story') {
      classes.push('fixed')
    } else {
      classes.push('py-8')
    }

    return { classes }
  },
  template: `<div :class="classes"><story/></div>`
})
