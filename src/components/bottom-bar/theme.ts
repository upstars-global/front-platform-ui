const bottomBar = {
  base: 'backdrop-blur-xl flex flex-col items-center justify-between px-2 w-full',
  buttonGroup: 'relative grid gap-4 grid-cols-2 items-center w-full py-2',
  container: 'flex gap-2 w-full py-2 items-center',
  navigation: {
    base: 'grid gap-2 grid-flow-col items-center w-full',
    variants: {
      'component-a': '',
      'component-b': '',
      'component-c': 'rounded-full p-2 min-h-12 items-stretch bg-backdrop-alt-2/80',
      'component-d': ''
    },
    states: {
      loggedIn: {
        'component-a': '',
        'component-b': 'grid-cols-5 [&>*:nth-child(3)]:col-start-4 [&>*:nth-child(4)]:col-start-5',
        'component-c': '',
        'component-d': ''
      }
    }
  },
  action: {
    base: 'flex items-center justify-center gap-2',
    icon: {
      'component-a': 'hidden',
      'component-b': 'block',
      'component-c': 'hidden',
      'component-d': 'block'
    },
    label: {
      'component-a': '',
      'component-b': 'absolute top-full mt-px font-bold text-menu hover:text-menu-active',
      'component-c': '',
      'component-d': 'hidden'
    },
    imageGift: {
      'component-a': 'w-6 h-6',
      'component-b': '',
      'component-c': 'w-6 h-6',
      'component-d': ''
    },
    variants: {
      'component-a': '',
      'component-b': 'absolute px-2 -top-2 left-1/2 -translate-x-1/2 text-caption-s font-bold',
      'component-c': 'shrink-0 max-w-[33%]',
      'component-d': 'px-2'
    }
  },
  item: {
    base: 'flex flex-col items-center justify-center text-menu hover:text-menu-active',
    label: 'text-caption-s font-bold',
    badge: 'absolute -top-0.5 right-0.5 w-4 h-4 bg-success text-pin',
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
    'component-a': 'bg-backdrop-alt-2/80',
    'component-b': 'bg-backdrop-alt-2/80',
    'component-c': '',
    'component-d': 'rounded-full bg-backdrop-alt-2/80'
  }
}

export type BottomBarUi = typeof bottomBar

export default bottomBar
