import type { SidebarNavigationItem } from '@src/components/sidebar/components/SidebarNavigation.vue'

export const SIDEBAR_NAVIGATION: SidebarNavigationItem[] = [
  { route: '/sport', title: 'Sports', visibleOnlyOnXs: true, dataTest: 'sidebar-betting', icon: 'bet' },
  { route: '/', title: 'Esports', icon: 'eSport', dataTest: 'sidebar-esport' },
  { route: '/promo', title: 'Promotions', dataTest: 'sidebar-promotions', icon: 'arena' },
  { route: '/bonus', title: 'Top offers', dataTest: 'sidebar-casino-bonuses', icon: 'bonuses' },
  { route: '/gift', title: 'Gift Shop', dataTest: 'sidebar-gift-shop-active', icon: 'giftShop' },
  {
    route: '/santa',
    title: 'Santa’s Lapland',
    dataTest: 'sidebar-global-event',
    icon: 'birthdayPromo',
    theme: 'special',
    badge: {
      label: 'Seasonal',
      theme: 'bg-secondary-10'
    }
  },
  {
    route: '/vip',
    title: 'VIP Club',
    dataTest: 'sidebar-vip-club',
    icon: 'vip',
    image: {
      src: 'https://placehold.co/56x56',
      alt: 'VIP Club'
    },
    hasBackground: true
  },
  { route: '/user', title: 'Profile', dataTest: 'sidebar-profile', icon: 'profile' },
  { route: '/faq', title: 'FAQ', dataTest: 'sidebar-faq', icon: 'faq' }
]
