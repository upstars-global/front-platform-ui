const tooltip = {
  base: 'relative align-middle',
  activator: 'align-middle cursor-pointer',
  body: 'box-border text-center text-white text-xs absolute z-10 transition duration-500 ease-easing invisible opacity-0',
  bodyVisible: '!visible !opacity-100',
  arrow: 'absolute z-10 block w-2 h-2 rotate-45'
}

export type TooltipUi = typeof tooltip

export default tooltip
