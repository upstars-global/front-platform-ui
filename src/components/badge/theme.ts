const badge = {
  base: 'text-center w-fit font-bold flex items-center justify-center',
  size: {
    default: '',
    sm: 'px-2',
    md: 'py-1 px-2'
  },
  variants: {
    default: 'rounded-6',
    cropped: 'rounded-b-2',
    counter: 'rounded-full'
  }
}

export type BadgeUi = typeof badge

export default badge
