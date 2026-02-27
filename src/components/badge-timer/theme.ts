import type { TimerUi } from '../timer/theme'

const badgeTimer = {
  base: '',
  label: 'mr-0.5',
  size: {
    sm: 'w-fit px-2',
    md: 'w-fit py-1 px-2'
  },
  variants: {
    default: '',
    outline: 'border bg-transparent',
    soft: 'border border-transparent'
  },
  states: {
    default: 'rounded-6',
    cropped: 'rounded-b-2'
  },
  indicator: {
    base: "flex items-center justify-center mr-1.5 before:content-[''] before:w-2 before:h-2 before:rounded-full before:inline-block",
    variants: {
      info: '',
      error: '',
      success: '',
      warning: ''
    }
  },
  timer: {
    base: 'flex items-center'
  } as TimerUi
}

export type BadgeTimerUi = typeof badgeTimer

export default badgeTimer
