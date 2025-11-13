const badge = {
  base: 'text-center font-bold flex items-center justify-center',
  size: {
    default: '',
    sm: 'w-fit px-2',
    md: 'w-fit py-1 px-2'
  },
  variants: {
    default: 'rounded-6',
    cropped: 'rounded-b-2',
    counter: 'rounded-full'
  },
  leadingIcon: 'mr-1',
  trailingIcon: 'ml-1'
}

export type BadgeUi = typeof badge

export default badge
