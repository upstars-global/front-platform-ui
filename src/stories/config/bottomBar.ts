import type { UiBottomBarProps } from '@src/components'

export const BOTTOM_BAR_NAVIGATION: UiBottomBarProps['navigation'] = [
  { id: 'home', label: 'Home', icon: 'arena', to: '/', dataTest: 'home', isHidden: false },
  { id: 'services', label: 'Services', icon: 'table', to: '/', dataTest: 'services', isHidden: false },
  { id: 'projects', label: 'Projects', icon: 'bet', to: '/', counter: 10, dataTest: 'projects', isHidden: false }
]
