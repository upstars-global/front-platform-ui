const button = {
  base: 'flex gap-2 lg:gap-4 items-center justify-center cursor-pointer outline-none outline-0 border-0 font-bold rounded-6 transition',
  size: {
    default: '',
    xs: 'py-2 px-4 text-caption-m h-8',
    sm: 'py-2 px-4 text-caption-l',
    md: 'py-2 px-6 text-body-l'
  },
  variants: {
    default: '',
    primary: 'text-dark',
    secondary: 'text-light',
    tertiary: 'text-light bg-transparent shadow-button hover:shadow-none active:shadow-none',
    ghost: 'p-2 text-light bg-transparent',
    destructive: 'text-dark bg-error-20 hover:bg-error-10 active:bg-error-30'
  },
  active: {
    default: '',
    primary: '',
    secondary: '',
    tertiary: '!shadow-none',
    ghost: '',
    destructive: '!bg-error-30'
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
