import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3-vite'
import FrontPlatformUi from '@src/plugins/vue-plugin'
import './css/tailwind.css'
import '@src/assets/css/variables/index.css'

setup(async (app) => {
  // added for testing
  app.use(FrontPlatformUi, {})
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
