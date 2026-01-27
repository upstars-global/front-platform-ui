import type { AppConfig } from '@src/components/types'

export const uiKitConfig: AppConfig = {
  ui: {
    accordion: {
      item: 'p-2 bg-slate-300 border-slate-300 rounded-4 cursor-pointer'
    },
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
    chip: {
      strategy: 'merge',
      base: 'text-slate-900 border-slate-300 hover:bg-slate-300',
      states: {
        active: 'bg-sky-500 border-sky-500 text-white',
        special: 'bg-slate-300 hover:bg-slate-500'
      }
    },
    circleProgressBar: {
      progress: {
        trail: 'stroke-indigo-300',
        line: 'stroke-indigo-500'
      }
    },
    icon: { strategy: 'merge' },
    image: {
      strategy: 'merge',
      base: ''
    },
    link: {
      variants: {
        primary: 'text-sky-500 hover:text-sky-600'
      }
    },
    loader: {
      base: 'm-0'
    },
    menu: {
      base: 'bg-neutral-100',
      item: {
        base: 'text-sky-500 hover:text-sky-600',
        active: 'text-violet-500 hover:text-violet-600'
      }
    },
    progressBar: {
      progress: {
        content: 'text-xs leading-4',
        trail: 'bg-slate-300',
        line: 'bg-sky-500'
      }
    },
    modal: {
      base: 'bg-white',
      states: {
        fullscreen: 'border-cyan-500'
      },
      title: 'text-slate-900 text-base md:text-xl font-bold',
      description: 'text-slate-600',
      closeIcon: 'text-slate-600'
    },
    modalRenderer: {
      overlay: 'bg-black/50'
    },
    skeleton: {
      base: 'bg-slate-500'
    },
    switch: {
      checkmark: {
        base: 'border-slate-500 after:bg-slate-500'
      },
      checked: 'border-sky-500 after:bg-sky-500'
    },
    input: {
      input: {
        base: 'bg-slate-100 autofill:bg-slate-50 focus:border-sky-500 border-slate-300 placeholder:text-slate-400',
        invalid: '!border-red-500'
      },
      recommendationsContainer: 'border-sky-500 bg-slate-50',
      recommendationsListItem: 'border-slate-300 hover:bg-slate-100 last:border-b-0 last:rounded-b-6',
      error: {
        content: 'bg-red-500',
        text: 'text-white'
      },
      tooltip: {
        body: 'pointer-events-none'
      }
    },
    select: {
      select: {
        base: 'bg-slate-100 focus:border-sky-500 border-slate-300',
        invalid: '!border-red-500'
      },
      error: {
        content: 'bg-red-500',
        text: 'text-white'
      }
    }
  }
}
