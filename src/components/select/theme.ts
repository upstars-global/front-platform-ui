const select = {
  base: '',
  label: 'block mb-1 px-4',
  container: 'relative',
  select: {
    base: 'w-full pr-8 rounded-6 bg-slate-100 focus:border-sky-500 outline-none cursor-pointer appearance-none border border-slate-300 px-4',
    sizeSmall: 'h-10',
    sizeMedium: 'h-12',
    textAlignRight: 'text-right',
    textAlignCenter: 'text-center',
    leftSlot: 'pl-12',
    invalid: 'border-2 !border-red-500'
  },
  leftSlot: 'absolute inset-y-0 left-4 flex items-center pointer-events-none',
  dropdownIcon: 'absolute inset-y-0 right-2 my-auto mx-0 pointer-events-none',
  error: {
    content: 'flex py-1 px-2 rounded-2 bg-red-500 text-center',
    text: 'text-white text-xs font-bold'
  },
  description: 'px-6 mt-1',
  states: {
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
    full: 'w-full',
    max: 'max-w-full w-max'
  }
}

export type SelectUi = typeof select

export default select
