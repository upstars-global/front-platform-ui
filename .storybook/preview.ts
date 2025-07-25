import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3-vite'
import { addIcons } from '@src/components/icon/icons'
import { ICONS } from '@src/stories/config/icons'
import './css/tailwind.css'
import '@src/assets/css/variables/index.css'

setup(async () => {
  addIcons(ICONS)
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
