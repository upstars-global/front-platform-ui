import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,ts,tsx,css}', './.storybook/**/*.{ts,css}'],
  theme: {
    extend: {
      boxShadow: {
        button: 'inset 0 0 0 1px rgba(0, 0, 0, 0.3)'
      }
    },
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans]
    },
    borderRadius: {
      0: 0,
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
    }
  }
}
