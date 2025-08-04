import plugin from 'tailwindcss/plugin'

export const circleProgressBarPlugin = plugin(({ addComponents }) => {
  addComponents({
    '@keyframes filling': {
      from: {
        strokeDashoffset: 'var(--circle-progress-dasharray, 0)'
      },
      to: {
        strokeDashoffset: 'var(--circle-progress-dashoffset, 0)'
      }
    },
    '.ui-circle-progress-bar': {
      stroke: 'var(--circle-progress-trail-color, currentColor)'
    },
    '.ui-circle-progress-line': {
      stroke: 'var(--circle-progress-line-color, currentColor)',
      strokeLinecap: 'var(--circle-progress-stroke-linecap, butt)',
      strokeDashoffset: 'var(--circle-progress-dashoffset, 0)',
      strokeDasharray: 'var(--circle-progress-dasharray, 0)'
    },
    '.ui-circle-progress-animation': {
      animationName: 'var(--circle-progress-animation-name, filling)',
      animationDuration: 'var(--circle-progress-animation-duration, 0)',
      animationTimingFunction: 'var(--circle-progress-animation-timing-function, ease-in)',
      transition: 'var(--circle-progress-transition, 0.5s all)'
    },
    '.ui-circle-progress-bg': {
      backgroundColor: 'var(--circle-progress-bg-color, transparent)'
    }
  })
})
