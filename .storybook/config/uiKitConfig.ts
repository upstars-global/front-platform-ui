import type { AppConfig } from '@src/components/types'
import type { UiPictureProps } from '@src/components'
import isChromatic from 'chromatic/isChromatic'
import { definePictureProvider } from '@src/utils/pictureProvider'

const customPictureProvider = definePictureProvider<
  UiPictureProps<{ imageId: string; sizes: string[]; queries: string[] }>
>({
  getPicture: ({ meta }) => {
    const imageId = meta?.imageId ?? ''
    const width = parseInt(meta?.sizes?.[0] ?? '') ?? 400
    const height = parseInt(meta?.sizes?.[1] ?? '') ?? 300
    const queries = (meta?.queries ?? []).join('&')

    return {
      url: `https://picsum.photos/id/${imageId}/${width}/${height}?${queries}`,
      sourceList: [
        {
          srcset: `https://picsum.photos/id/${imageId}/${width + 200}/${height + 200}?${queries}`,
          media: '(min-width: 1024px)'
        },
        {
          srcset: `https://picsum.photos/id/${imageId}/${width + 100}/${height + 100}?${queries}`,
          media: '(min-width: 768px)'
        },
        {
          srcset: `https://picsum.photos/id/${imageId}/${width}/${height}?${queries}`,
          media: '(min-width: 320px)'
        }
      ]
    }
  }
})

export const uiKitConfig: AppConfig = {
  providers: {
    picture: {
      custom: customPictureProvider
    }
  },
  store: {
    env: {
      get isMockerMode() {
        return isChromatic()
      }
    }
  },
  ui: {
    accordion: {
      item: 'p-2 bg-support border-support rounded-4 cursor-pointer'
    },
    badgeTimer: {
      strategy: 'merge',
      variants: {
        outline: 'text-dark'
      },
      indicator: {
        variants: {
          info: 'before:bg-primary-30'
        }
      }
    },
    banner: {
      strategy: 'merge',
      buttonWrapper: {
        variants: {
          default: 'bg-tertiary-30/70'
        }
      },
      content: {
        variants: {
          default: 'text-light'
        }
      },
      wrapper: {
        variants: {
          default: 'h-44 md:h-64 max-w-96'
        }
      }
    },
    bottomBar: {
      strategy: 'merge',
      action: {
        icon: {
          'component-b': 'text-light'
        }
      }
    },
    button: {
      variants: {
        primary: 'bg-primary-20 hover:bg-primary-30 active:bg-primary-50',
        secondary: 'bg-secondary-30 hover:bg-secondary-20 active:bg-secondary-40',
        tertiary: 'shadow-tertiary-40 text-tertiary-40 hover:text-light hover:bg-tertiary-20',
        ghost: '!text-support hover:!text-light hover:bg-tertiary-20 active:bg-tertiary-30'
      },
      active: {
        primary: '!bg-primary-50',
        secondary: '!bg-secondary-40',
        tertiary: '!bg-tertiary-10',
        ghost: '!bg-tertiary-30'
      }
    },
    card: {
      base: 'gap-4',
      variants: {
        default: '',
        soft: 'p-4 lg:p-6 bg-backdrop-alt-3',
        outline: 'p-4 lg:p-6 rounded-4 border-tertiary-20 bg-transparent',
        subtle: 'p-4 lg:p-6 rounded-4 border-tertiary-20 bg-backdrop-alt-3'
      },
      orientation: {
        vertical: '',
        horizontal: 'grid-cols-2 items-center'
      }
    },
    checkbox: {
      strategy: 'merge',
      base: 'text-dark',
      checkmark: {
        container: 'p-px',
        inner: 'border-tertiary-20'
      },
      error: 'text-caption-m text-error-20'
    },
    chip: {
      strategy: 'merge',
      base: 'text-dark border-support hover:bg-support',
      states: {
        active: 'bg-primary-30 border-primary-30 text-white',
        special: 'bg-support hover:bg-backdrop-alt-3'
      }
    },
    circleProgressBar: {
      content: 'bg-tertiary-30/50',
      progress: {
        trail: 'stroke-tertiary-30/70'
      }
    },
    header: {
      chatButton: {
        icon: 'text-support'
      },
      navigation: {
        item: {
          badge: 'bg-success',
          states: {
            background: 'bg-backdrop-alt-1 text-white',
            special: 'text-error-20'
          }
        },
        hiddenContent: 'bg-backdrop-alt-2'
      },
      wrapper: 'bg-backdrop-alt-2'
    },
    icon: { strategy: 'merge' },
    image: { strategy: 'merge' },
    loader: { base: 'm-0' },
    menu: { strategy: 'merge' },
    progressBar: {
      progress: {
        content: 'text-light'
      }
    },
    modal: {
      base: 'bg-white',
      states: {
        fullscreen: 'border-primary-30'
      },
      title: 'text-dark text-body md:text-body-l font-bold',
      description: 'text-backdrop-alt-2',
      closeIcon: 'text-backdrop-alt-2'
    },
    modalRenderer: {
      overlay: 'bg-black/50'
    },
    input: {
      strategy: 'merge',
      input: {
        base: 'bg-light autofill:bg-light/50 focus:border-primary-30 border-support placeholder:text-tertiary-30',
        invalid: 'border-error-20'
      },
      recommendationsContainer: 'border-primary-30 bg-light',
      recommendationsListItem: 'border-support hover:bg-light last:border-b-0 last:rounded-b-6',
      error: {
        content: 'bg-error-20',
        text: 'text-white'
      },
      tooltip: {
        body: 'pointer-events-none'
      }
    },
    select: {
      container: '!text-dark',
      select: {
        base: 'bg-light focus:border-primary-30 border-support',
        invalid: '!border-error-20'
      }
    },
    sidebar: {
      strategy: 'merge',
      overlay: 'bg-tertiary-20/50'
    },
    stepper: {
      states: {
        inactive: 'bg-secondary-40'
      }
    },
    switch: {
      checkmark: {
        base: 'border-tertiary-10 after:bg-tertiary-10'
      }
    },
    tabs: {
      container: 'bg-dark border-tertiary-30/40',
      content: 'py-4',
      item: {
        active: 'bg-secondary-30'
      }
    },
    fileUpload: {
      description: 'mt-4'
    },
    reviewWidget: {
      container: 'gap-6 bg-dark text-light p-4 rounded-4',
      imageContainer: 'w-24 h-24',
      contentContainer: 'gap-4',
      actionArea: 'w-full',
      content: 'flex flex-col gap-4'
    },
    filePreviewItem: {
      container: 'p-3 w-full text-left rounded-2 border border-tertiary-20/40 bg-backdrop-alt-3/80 text-light',
      infoContainer: 'gap-3',
      contentContainer: 'gap-0.5',
      fileName: 'text-caption-m',
      fileSize: 'text-caption-m',
      removeButton:
        '!p-2 !bg-transparent hover:!bg-tertiary-10/20 text-error-10 rounded-full transition-colors duration-200 cursor-pointer'
    }
  }
}
