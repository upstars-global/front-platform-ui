const switchTheme = {
  base: 'block relative cursor-pointer select-none',
  input: 'absolute opacity-0 cursor-pointer h-0 w-0',
  checkmark: {
    base: [
      'absolute top-0 right-0 h-full w-full bg-transparent rounded-6 border-2',
      'after:absolute after:left-0.5 after:top-1/2 after:border-0 after:rounded-6 after:-translate-y-1/2',
      'after:transition-all after:duration-200'
    ].join(' '),
    size: {
      sm: 'after:h-3 after:w-3',
      md: 'after:h-4 after:w-4',
      lg: 'after:h-5 after:w-5'
    }
  },
  checked: 'after:translate-x-[calc(100%+0.5rem)]',
  states: {
    disabled: 'opacity-50 pointer-events-none cursor-not-allowed'
  },
  size: {
    sm: 'w-10 h-5',
    md: 'w-12 h-6',
    lg: 'w-14 h-7'
  }
}

export type SwitchUi = typeof switchTheme

export default switchTheme
