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
    primary: 'text-dark bg-primary-20 hover:bg-primary-30 active:bg-primary-50',
    secondary: 'text-light hover:bg-secondary-2 active:bg-secondary-4',
    tertiary: [
      'text-light bg-transparent shadow-button',
      'hover:bg-tertiary-2 hover:shadow-none active:bg-tertiary-1 active:shadow-none'
    ].join(' '),
    ghost: 'p-2 text-support bg-transparent hover:bg-tertiary-2 active:bg-tertiary-3',
    destructive: 'text-dark bg-error-20 hover:bg-error-10 active:bg-error-30'
  },
  active: {
    default: '',
    primary: '!bg-primary-50',
    secondary: '!bg-secondary-4',
    tertiary: '!bg-tertiary-1 !shadow-none',
    ghost: '!bg-tertiary-3',
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
