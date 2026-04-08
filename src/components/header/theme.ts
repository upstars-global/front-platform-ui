const header = {
  base: 'sticky top-0 z-1005',
  chatButton: {
    base: 'relative',
    badge: 'absolute top-0 right-0 w-4 h-4',
    icon: ''
  },
  container: {
    base: 'flex gap-2 lg:gap-4 items-center justify-end',
    variants: {
      'component-a': '',
      'component-b': '',
      'component-c': 'flex-row-reverse',
      'component-d': 'flex-row-reverse',
      simple: ''
    }
  },
  content: 'flex justify-end lg:grid gap-4 lg:gap-6 grid-cols-[minmax(0,_1fr),_auto] h-full',
  inner: {
    base: 'relative justify-center items-center gap-4 lg:gap-6 transition-all duration-300 w-full h-full mx-4 lg:mx-14 xl:mx-auto',
    variants: {
      'component-a': 'grid grid-cols-[max-content,_minmax(0,_1fr)]',
      'component-b': 'grid grid-cols-[max-content,_minmax(0,_1fr)]',
      'component-c': 'grid grid-cols-[max-content,_minmax(0,_1fr)]',
      'component-d': 'grid grid-cols-[max-content,_minmax(0,_1fr)]',
      simple: 'flex'
    }
  },
  logo: 'flex items-center h-10 w-24 cursor-pointer',
  navigation: {
    base: 'hidden lg:flex h-full',
    container: 'flex gap-6 w-full',
    hiddenContent: 'p-3 rounded-b-4',
    hiddenLink: 'mb-3 last:mb-0',
    item: {
      base: 'relative flex items-center h-full transition duration-200 ease-easing cursor-pointer whitespace-nowrap',
      badge: 'ml-2 uppercase',
      icon: 'mr-1',
      states: {
        active: '',
        background: '',
        special: ''
      }
    }
  },
  wrapper: 'backdrop-blur-xl flex items-center justify-center w-full h-16'
}

export type HeaderUi = typeof header
export type HeaderNavigationUi = typeof header.navigation
export type ChatButtonUi = typeof header.chatButton

export default header
