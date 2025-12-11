const card = {
  base: 'relative grid',
  rounded: 'rounded-6',
  wrapper: 'flex flex-col flex-1',
  header: 'flex-1',
  body: 'flex-1',
  footer: 'flex-1',
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
