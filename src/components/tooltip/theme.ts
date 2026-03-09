const tooltip = {
  base: 'relative align-middle',
  activator: 'align-middle cursor-pointer',
  body: 'max-w-64 w-max py-2 px-4 box-border absolute z-10 transition-opacity duration-200 ease-in-out invisible opacity-0 rounded-2',
  bodyVisible: '!visible !opacity-100',
  arrow: 'absolute z-10 block w-2 h-2 rotate-45'
}

export type TooltipUi = typeof tooltip

export default tooltip
