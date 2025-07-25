import type { StorybookConfig } from '@storybook/vue3-vite'

export default {
  stories: ['../docs/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-vitest', '@chromatic-com/storybook', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  }
} satisfies StorybookConfig
