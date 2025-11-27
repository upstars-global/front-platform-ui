const tooltip = {
  base: 'relative align-middle',
  activator: 'align-middle cursor-pointer',
  body: 'box-border text-center text-white text-xs absolute z-10 transition-opacity duration-200 ease-in-out invisible opacity-0',
  bodyVisible: '!visible !opacity-100'
}

export type TooltipUi = typeof tooltip

export default tooltip
