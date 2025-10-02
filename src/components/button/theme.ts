const button = {
  base: 'flex gap-2 lg:gap-4 items-center justify-center cursor-pointer outline-none outline-0 border-0 font-bold rounded-6 transition',
  size: {
    default: '',
    xs: 'py-2 px-4',
    sm: 'py-2 px-4',
    md: 'py-2 px-6'
  },
  variants: {
    default: '',
    primary: '',
    secondary: '',
    tertiary: '',
    ghost: ''
  },
  active: {
    default: '',
    primary: '',
    secondary: '',
    tertiary: '',
    ghost: ''
  },
  states: {
    disabled: 'opacity-50 pointer-events-none cursor-not-allowed',
    full: 'w-full'
  },
  leadingIcon: '',
  trailingIcon: ''
}

export type ButtonUi = typeof button

export default button
