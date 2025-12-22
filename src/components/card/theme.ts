const card = {
  base: 'relative grid',
  rounded: 'rounded-6',
  variants: {
    default: '',
    outline: 'bg-transparent border',
    soft: '',
    subtle: 'border'
  },
  orientation: {
    vertical: '',
    horizontal: ''
  }
}

export type CardUi = typeof card

export default card
