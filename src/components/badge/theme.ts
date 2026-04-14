const badge = {
  base: 'text-center text-dark font-bold flex items-center justify-center',
  size: {
    default: 'text-caption-s',
    sm: 'w-fit px-2 text-caption-s',
    md: 'w-fit py-1 px-2 text-caption-m'
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
