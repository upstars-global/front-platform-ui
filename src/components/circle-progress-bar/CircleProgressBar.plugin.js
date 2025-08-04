import plugin from 'tailwindcss/plugin'

export const circleProgressBarPlugin = plugin(({ addComponents }) => {
  addComponents({
    '.ui-circle-progress-line-rounded': {
      strokeLinecap: 'var(--circle-progress-stroke-linecap, round)'
    },
    '.ui-circle-progress-line-butt': {
      strokeLinecap: 'var(--circle-progress-stroke-linecap, butt)'
    }
  })
})
