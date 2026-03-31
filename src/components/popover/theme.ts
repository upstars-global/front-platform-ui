const popover = {
  base: 'relative',
  anchor: 'cursor-pointer',
  content: 'pointer-events-auto',
  wrapper: 'absolute z-999 pointer-events-none'
}

export type PopoverUi = typeof popover

export default popover
