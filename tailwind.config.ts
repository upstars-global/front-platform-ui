import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin.js'
import { carouselPlugin } from './src/components/carousel/tailwind.plugin.ts'

const uiPlugins = plugin((helpers) => {
  carouselPlugin.handler(helpers)
})

export const config = {
  content: ['./docs/**/*.mdx', './src/**/*.{vue,ts,tsx,css}', './.storybook/**/*.{ts,css}'],
  theme: {
    extend: {
      animation: {
        skeleton: 'skeleton 1.5s linear infinite'
      },
      boxShadow: {
        button: 'inset 0 0 0 1px rgba(0, 0, 0, 0.3)'
      },
      keyframes: {
        skeleton: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      transitionTimingFunction: {
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)'
      },
      willChange: {
        'background-position': 'background-position'
      },
      zIndex: {
        900: '900', // bottom-menu
        999: '999', // popover
        1005: '1005', // header
        1010: '1010' // sidebar
      }
    },
    borderRadius: {
      none: '0',
      0.5: '0.125rem', // 2px
      1: '0.25rem', // 4px
      1.5: '0.375rem', // 6px
      2: '0.5rem', // 8px
      2.5: '0.625rem', // 10px
      3: '0.75rem', // 12px
      4: '1rem', // 16px
      5: '1.25rem', // 20px
      6: '1.5rem', // 24px
      7: '1.75rem', // 28px
      8: '2rem', // 32px
      full: '9999px'
    },
    screens: {
      xs: '360px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1440px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff',
      primary: {
        10: '#7dd3fc', // sky-300
        20: '#38bdf8', // sky-400
        30: '#0ea5e9', // sky-500
        40: '#0284c7', // sky-600
        50: '#0369a1' // sky-700
      },
      secondary: {
        10: '#f0abfc', // fuchsia-300
        20: '#e879f9', // fuchsia-400
        30: '#d946ef', // fuchsia-500
        40: '#c026d3', // fuchsia-600
        50: '#a21caf' // fuchsia-700
      },
      tertiary: {
        10: '#9ca3af', // gray-400
        20: '#6b7280', // gray-500
        30: '#4b5563', // gray-600
        40: '#374151', // gray-700
        50: '#1f2937' // gray-800
      },
      error: {
        DEFAULT: '#ef4444', // red-500
        10: '#f87171', // red-400
        20: '#ef4444', // red-500
        30: '#dc2626' // red-600
      },
      success: {
        DEFAULT: '#22c55e' // green-500
      },
      warning: {
        DEFAULT: '#f59e0b' // amber-500
      },
      personal: {
        DEFAULT: '#facc15' // yellow-400
      }
    }
  },
  plugins: [uiPlugins]
} satisfies Config

export default config
