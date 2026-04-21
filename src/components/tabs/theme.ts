import type { UiProp } from '../types'

const tabs = {
  base: 'flex flex-col items-start relative text-menu',
  container: 'flex relative rounded-6 p-1 border',
  content: 'w-full',
  item: {
    base: 'flex font-normal relative outline-none rounded-4 py-1 px-4 cursor-pointer text-center justify-center text-caption-l hover:text-light transition-colors duration-150 ease-easing',
    active: 'font-bold !text-light',
    disabled: 'pointer-events-none cursor-not-allowed opacity-50',
    leadingIcon: 'mr-1',
    trailingIcon: 'ml-1'
  }
}

export type TabsUi = typeof tabs
export type TabUi = UiProp<typeof tabs.item>

export default tabs
