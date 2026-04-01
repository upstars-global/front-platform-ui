const bottomBar = {
  base: 'backdrop-blur-xl flex flex-col items-center justify-between px-2 w-full',
  buttonGroup: 'relative grid gap-4 grid-flow-col items-center w-full py-2',
  container: 'flex gap-2 w-full py-2 items-center',
  navigation: {
    base: 'grid gap-2 grid-flow-col items-center w-full',
    variants: {
      'component-a': '',
      'component-b': '',
      'component-c': 'rounded-full p-2 min-h-12 items-stretch',
      'component-d': ''
    }
  },
  action: {
    base: 'flex items-center justify-center gap-2 whitespace-nowrap',
    icon: {
      'component-a': 'hidden',
      'component-b': 'block',
      'component-c': 'hidden',
      'component-d': 'block'
    },
    label: {
      'component-a': 'block',
      'component-b': 'hidden',
      'component-c': 'block',
      'component-d': 'hidden'
    },
    variants: {
      'component-a': '',
      'component-b': 'px-2',
      'component-c': '',
      'component-d': 'px-2'
    }
  },
  item: {
    base: 'flex flex-col items-center justify-center',
    label: '',
    badge: 'absolute top-0 right-0 w-4 h-4',
    icon: '',
    states: {
      active: ''
    },
    labelVariants: {
      'component-a': '',
      'component-b': '',
      'component-c': 'hidden',
      'component-d': ''
    },
    wrapper: 'relative min-w-12 flex flex-col grow justify-center items-center'
  },
  variants: {
    'component-a': '',
    'component-b': '',
    'component-c': '',
    'component-d': 'rounded-full'
  }
}

export type BottomBarUi = typeof bottomBar

export default bottomBar
