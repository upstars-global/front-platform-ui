import type { AppConfig } from '@src/components/types'

export const uiKitConfig: AppConfig = {
  ui: {
    button: {
      base: 'grid grid-flow-col gap-2 lg:gap-4 items-center',
      size: {
        sm: 'text-xs leading-[135%]',
        md: 'text-sm leading-[170%]',
        lg: 'text-xl leading-[150%]'
      },
      variants: {
        primary: 'bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white',
        secondary: 'bg-slate-300 hover:bg-slate-200 active:bg-slate-400 text-black',
        tertiary: 'bg-transparent hover:bg-slate-200 active:bg-slate-400 shadow-button hover:shadow-none text-black'
      }
    },
    icon: { strategy: 'merge' },
    link: {
      variants: {
        primary: 'text-sky-500 hover:text-sky-600'
      }
    }
  }
}
