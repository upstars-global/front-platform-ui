const link = {
  base: 'cursor-pointer',
  variants: {
    default: 'no-underline',
    primary: 'underline font-bold text-link hover:text-link-active'
  }
}

export type LinkUi = typeof link

export default link
