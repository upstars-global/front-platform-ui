import type { HeaderNavigationItem } from '@src/components/header/components/HeaderNavigation.vue'

export const HEADER_NAVIGATION: HeaderNavigationItem[] = [
  { id: 'home', title: 'Home', route: '/', dataTest: 'home' },
  { id: 'services', title: 'Services', route: '/', dataTest: 'services' },
  { id: 'projects', title: 'Projects', route: '/', dataTest: 'projects' },
  { id: 'badge', title: 'With badge', route: '/', dataTest: 'badge', badge: { label: 'New', size: 'sm' } },
  { id: 'special', title: 'Special', route: '/', dataTest: 'item-5', isSpecial: true },
  { id: 'faq', title: 'FAQ', icon: 'faq', route: '/', dataTest: 'about', hasBackground: true },
  { id: 'contact', title: 'Contact us', route: '/', dataTest: 'contact' },
  { id: 'careers', title: 'Careers', route: '/', dataTest: 'careers' }
]
