import type { UiProp } from '../types'

const tabs = {
  base: 'flex flex-col items-start relative',
  container: 'flex relative rounded-6 p-1',
  content: 'w-full',
  item: {
    base: 'flex font-regular relative outline-none py-1 px-4 cursor-pointer text-center',
    active: '',
    disabled: 'pointer-events-none cursor-not-allowed opacity-50',
    leadingIcon: 'mr-1',
    trailingIcon: 'ml-1'
  }
}

export type TabsUi = typeof tabs
export type TabUi = UiProp<typeof tabs.item>

export default tabs
