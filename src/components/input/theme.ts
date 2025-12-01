const input = {
  base: '',
  label: 'block mb-1 px-4',
  container: 'relative flex items-center w-full h-12 outline-none',
  input: {
    base: 'w-full h-full py-0 px-4 m-0 text-left autofill:bg-none rounded-6 outline-none transition-[padding] duration-300 ease-out border',
    textAlignRight: 'text-right',
    textAlignCenter: 'text-center',
    leftSlot: 'pl-12',
    rightSlot: 'pr-12',
    disabled: 'border-transparent',
    invalid: 'border-2',
    recommendations: 'border-b-0 focus:border-b-0 rounded-b-none focus:rounded-b-none'
  },
  leftSlot: 'absolute left-4 mr-2',
  rightSlot: 'absolute right-4 ml-2',
  recommendationsContainer: 'absolute top-full w-full rounded-b-6 border border-t-0 z-50',
  recommendationsList: 'p-0 list-none',
  recommendationsListItem: 'relative py-3 px-4 border border-l-0 border-r-0 cursor-pointer transition-colors',
  error: {
    content: 'flex py-1 px-2 rounded-2 text-center',
    text: 'text-xs font-bold'
  },
  description: 'px-6 mt-1',
  states: {
    disabled: 'opacity-50 cursor-not-allowed'
  }
}

export type InputUi = typeof input

export default input
