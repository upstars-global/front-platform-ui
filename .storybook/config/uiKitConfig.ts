import type { AppConfig } from '@src/components/types'

export const uiKitConfig: AppConfig = {
  ui: {
    button: {
      size: {
        xs: 'text-xs leading-4',
        sm: 'text-sm leading-[170%]',
        md: 'text-xl leading-[150%]'
      },
      variants: {
        primary: 'bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white',
        secondary: 'bg-slate-300 hover:bg-slate-200 active:bg-slate-400 text-black',
        tertiary: 'bg-transparent hover:bg-slate-200 active:bg-slate-400 shadow-button hover:shadow-none text-black',
        ghost: 'bg-transparent text-black hover:bg-slate-200 active:bg-slate-400'
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
