const menu = {
  base: 'flex w-full p-2 gap-2 overflow-x-auto justify-start rounded-6 sm:w-fit sm:justify-center',
  item: {
    base: 'flex items-center justify-center whitespace-nowrap cursor-pointer transition-all duration-200 ease-easing py-1 px-4 rounded-6 font-bold',
    active: ''
  }
}

export type MenuUi = typeof menu

export default menu
