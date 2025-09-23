const button = {
  base: 'text-center cursor-pointer outline-0 border-0 font-bold rounded-6 transition',
  size: {
    default: '',
    sm: 'py-2 px-4',
    md: 'py-2 px-4',
    lg: 'py-2 px-6'
  },
  variants: {
    default: '',
    primary: '',
    secondary: '',
    tertiary: ''
  },
  states: {
    disabled: 'opacity-50 pointer-events-none cursor-not-allowed',
    full: 'w-full'
  }
}

export type ButtonUi = typeof button

export default button
