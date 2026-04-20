import type { TimerUi } from '../timer/theme'

const badgeTimer = {
  base: 'font-bold',
  label: 'mr-0.5 font-normal',
  size: {
    sm: 'w-fit px-2 text-caption-s',
    md: 'w-fit py-1 px-2 text-caption-m'
  },
  variants: {
    default: '',
    outline: 'text-light border bg-transparent border-backdrop-alt-2',
    soft: 'text-light border border-transparent bg-backdrop-alt-2'
  },
  states: {
    default: 'rounded-6',
    cropped: 'rounded-b-2'
  },
  indicator: {
    base: "flex items-center justify-center mr-1.5 before:content-[''] before:w-2 before:h-2 before:rounded-full before:inline-block",
    variants: {
      info: '',
      error: 'before:bg-error-20',
      success: 'before:bg-success',
      warning: 'before:bg-warning'
    }
  },
  timer: {
    base: 'flex items-center'
  } as TimerUi
}

export type BadgeTimerUi = typeof badgeTimer

export default badgeTimer
