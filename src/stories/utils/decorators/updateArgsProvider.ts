import type { Decorator } from '@storybook/vue3-vite'
import { useArgs } from 'storybook/internal/preview-api'

export const updateArgsProvider: Decorator = (story, context) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, updateArgs] = useArgs()

  return story({ ...context, updateArgs })
}
