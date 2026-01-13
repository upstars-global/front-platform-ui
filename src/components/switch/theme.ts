const switchTheme = {
  base: 'block relative cursor-pointer select-none',
  input: 'absolute opacity-0 cursor-pointer h-0 w-0',
  checkmark: {
    base: [
      'absolute top-0 right-0 h-full w-full bg-transparent rounded-6 border-2',
      'after:absolute after:left-1 after:top-1/2 after:border-0 after:rounded-6 after:-translate-y-1/2',
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
    sm: 'w-11 h-6',
    md: 'w-[3.25rem] h-7',
    lg: 'w-[3.75rem] h-8'
  }
}

export type SwitchUi = typeof switchTheme

export default switchTheme
