import type { TooltipUi } from '../tooltip/theme'
import type { UiProp } from '../types'

export type SelectUi = {
  base: string
  label: string
  container: string
  select: {
    base: string
    sizeSmall: string
    sizeMedium: string
    textAlignRight: string
    textAlignCenter: string
    leftSlot: string
    invalid: string
    hasValue: string
  }
  leftSlot: string
  dropdownIcon: string
  error: {
    content: string
    text: string
  }
  description: string
  tooltip?: UiProp<TooltipUi>
  states: {
    disabled: string
    full: string
    max: string
  }
}

const select: SelectUi = {
  base: '',
  label: 'block mb-1 px-4',
  container: 'relative',
  select: {
    base: 'w-full pr-8 rounded-6 outline-none cursor-pointer appearance-none border px-4',
    sizeSmall: 'h-10',
    sizeMedium: 'h-12',
    textAlignRight: 'text-right',
    textAlignCenter: 'text-center',
    leftSlot: 'pl-12',
    invalid: 'border-2',
    hasValue: 'text-alt'
  },
  leftSlot: 'absolute inset-y-0 left-4 flex items-center pointer-events-none',
  dropdownIcon: 'absolute inset-y-0 right-2 my-auto mx-0 pointer-events-none',
  error: {
    content: 'flex py-1 px-2 rounded-2 text-center',
    text: 'text-xs font-bold'
  },
  description: 'px-6 mt-1',
  tooltip: {},
  states: {
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
    full: 'w-full',
    max: 'max-w-full w-max'
  }
}

export default select
