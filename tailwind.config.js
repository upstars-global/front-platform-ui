import plugin from 'tailwindcss/plugin.js'
import { btnPlugin } from './src/components/button/ButtonPlugin.js'
import { TypographyPlugin } from './src/helpers/TypographyPlugin.js'
import { checkboxPlugin } from './src/components/checkbox/Checkbox.plugin'
import defaultTheme from 'tailwindcss/defaultTheme'

const uiPlugin = plugin((helpers) => {
  btnPlugin.handler(helpers)
  TypographyPlugin.handler(helpers)
  checkboxPlugin.handler(helpers)
})

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,ts,tsx,css}'],
  theme: {
    extend: {
      animation: {
        'spin-reverse': 'spin 1s linear infinite reverse'
      }
    },
    fontFamily: {
      sans: ['var(--font-family)', ...defaultTheme.fontFamily.sans]
    }
  },
  plugins: [uiPlugin]
}
