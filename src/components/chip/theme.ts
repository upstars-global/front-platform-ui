const chip = {
  base: 'flex items-center justify-center gap-1 py-2 px-4 text-center border rounded-6 cursor-pointer',
  states: {
    active: '',
    special: ''
  },
  carousel: {
    base: '',
    item: ''
  },
  group: {
    base: 'flex flex-wrap gap-2',
    item: ''
  },
  leadingIcon: '',
  trailingIcon: ''
}

export type ChipUi = typeof chip

export default chip
