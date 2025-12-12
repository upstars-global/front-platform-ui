import type { AppConfig } from '@src/components/types'

export const uiKitConfig: AppConfig = {
  ui: {
    badge: {
      size: {
        default: 'text-[10px] tracking-wider',
        sm: 'text-[10px]',
        md: 'text-xs'
      }
    },
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
    card: {
      base: 'gap-4',
      variants: {
        default: '',
        outline: 'px-4 py-6 border-slate-300',
        soft: 'px-4 py-6 bg-slate-300',
        subtle: 'px-4 py-6 border-slate-500 bg-slate-300'
      },
      orientation: {
        vertical: '',
        horizontal: 'grid-cols-2 items-center'
      }
    },
    carousel: {
      pagination: {
        item: 'bg-slate-300',
        active: 'bg-sky-500'
      }
    },
    checkbox: {
      base: 'text-sm',
      checkmark: {
        container: 'p-px',
        inner: 'border-slate-500',
        checked: 'bg-slate-500 text-white',
        invalid: '!border-red-500'
      },
      error: 'text-xs text-red-500'
    },
    circleProgressBar: {
      progress: {
        trail: 'stroke-indigo-300',
        line: 'stroke-indigo-500'
      }
    },
    icon: { strategy: 'merge' },
    link: {
      variants: {
        primary: 'text-sky-500 hover:text-sky-600'
      }
    },
    menu: {
      base: 'bg-neutral-100',
      item: {
        base: 'text-sky-500 hover:text-sky-600',
        active: 'text-violet-500 hover:text-violet-600'
      }
    },
    skeleton: {
      base: 'bg-slate-500'
    }
  }
}
