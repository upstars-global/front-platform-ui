const sidebar = {
  base: '',
  container: {
    base: 'h-full w-full flex flex-col justify-between fixed inset-y-0 z-1010 max-w-80 bg-backdrop-alt-2 duration-300 overflow-hidden transition-transform',
    side: {
      left: 'left-0 right-full',
      right: 'right-0 left-full'
    }
  },
  content: {
    base: 'h-full',
    variants: {
      'component-a': '',
      'component-b': 'p-4',
      'component-c': 'p-4',
      'component-d': 'p-4'
    }
  },
  header: 'relative flex justify-between items-center cursor-pointer p-4',
  title: 'text-light text-body font-bold',
  closeIcon: 'text-support',
  footer: '',
  timeSlot: 'pt-4',
  overlay: 'fixed inset-0 z-1010 backdrop-blur-md',
  navigation: {
    base: 'grid',
    item: {
      base: 'relative cursor-pointer flex gap-4 items-center text-caption-l font-bold group text-menu hover:text-menu-active active:text-menu-active',
      icon: 'w-6 h-6 shrink-0 rounded-2 p-0 group-hover:text-menu-active group-active:text-menu-active',
      label: 'flex grow items-center justify-between',
      badge: '',
      image: 'h-14 w-14',
      states: {
        active: 'text-menu-active',
        background: 'bg-backdrop-alt-1 !py-0',
        special: 'text-secondary-10'
      },
      variants: {
        'component-a': 'p-4',
        'component-b': 'p-4',
        'component-c': 'py-2',
        'component-d': 'my-1 bg-backdrop-alt-1 px-4 py-2 rounded-2'
      }
    },
    variants: {
      'component-a': '',
      'component-b': 'bg-backdrop-alt-1 my-2 rounded-2',
      'component-c': '',
      'component-d': 'py-3'
    }
  }
}

export type SidebarUi = typeof sidebar
export type SidebarNavigationUi = typeof sidebar.navigation

export default sidebar
