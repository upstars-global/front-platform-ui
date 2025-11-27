import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3-vite'
import type { Plugin } from 'vue'
import FrontPlatformUi from '@src/plugins/vue-plugin'
import Vue3Mask from 'vue3-mask'
import Vue3OutsideEvents from 'vue3-outside-events'
import { uiKitConfig } from './config/uiKitConfig'
import './css/tailwind.css'

setup(async (app) => {
  // added for testing
  app.use(FrontPlatformUi, uiKitConfig)
  app.use(Vue3Mask as Plugin)
  app.use(Vue3OutsideEvents)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
