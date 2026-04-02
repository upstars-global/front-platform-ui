import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { computed } from 'vue'
import { emitsObserver, vueRouter } from '@src/stories/utils/decorators'
import { UiButton, UiDropdown, UiIcon, UiHeader } from '@src/components'
import { HEADER_NAVIGATION } from '../config/header'

type HeaderPropsAndCustomArgs = ComponentProps<typeof UiHeader> & {
  isLoggedIn?: boolean
}

const meta = {
  title: 'UI Kit/Header',
  component: UiHeader,
  tags: ['autodocs'],
  decorators: [emitsObserver, vueRouter()],
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    chatMessageCount: { control: 'number' },
    isMobileChatButton: { control: 'boolean' },
    logo: { control: 'object' },
    logoRoute: { control: 'text' },
    // @ts-expect-error invalid error. 'array' is correct based on docs
    navigation: { control: 'array' },
    variant: { control: 'select', options: ['simple', 'component-a', 'component-b', 'component-c', 'component-d'] },
    ui: { control: 'object' },
    // custom args
    isLoggedIn: { control: 'boolean' }
  },
  args: {
    chatMessageCount: 1,
    isMobileChatButton: false,
    logo: {
      alt: 'Logo',
      src: '/assets/header/logo-full.svg'
    },
    logoRoute: '/',
    navigation: HEADER_NAVIGATION,
    // custom args
    isLoggedIn: false
  },
  render: (args, context) => ({
    name: 'Story',
    components: { UiButton, UiDropdown, UiIcon, UiHeader },
    setup: () => {
      return {
        args,
        navigation: computed(() => {
          if (args.variant === 'simple') {
            return
          }

          if (context.viewMode === 'docs') {
            return args.navigation?.map((item) => {
              return {
                ...item,
                id: `${item.id}-${context.story.replaceAll(' ', '')}`
              }
            })
          }

          return args.navigation
        })
      }
    },
    template: `<UiHeader v-bind="args" :navigation="navigation">
      <template #content v-if="args.variant !== 'simple'">
        <div class="w-full lg:w-auto">
          <div v-if="args.isLoggedIn" :class="['flex gap-2 lg:gap-4 justify-between', args.variant === 'component-c' || args.variant === 'component-d' ? 'flex-row-reverse' : '']">
            <div :class="['flex items-center gap-2 lg:gap-4']">
              <UiDropdown class="flex items-center py-1 px-2 border border-slate-200 rounded-4">
                <template #activator>
                  <UiButton
                    class="text-[10px] md:text-xs leading-4 gap-0.5"
                    variant="default"
                    size="default"
                    trailing-icon-name="dropdownDown"
                    trailing-icon-size="16"
                    :ui="{ strategy: 'merge' }"
                  >
                    <span>5400 USD</span>
                  </UiButton>
                </template>
              </UiDropdown>
              <UiButton class="hidden lg:block">Deposit</UiButton>
              <UiButton v-if="args.variant === 'component-d'" class="flex lg:hidden !p-2">
                <UiIcon name="plus" />
              </UiButton>
            </div>
            <UiButton v-if="args.variant === 'component-a' || args.variant === 'component-c'" class="hidden lg:block" size="default" variant="ghost">
              <UiIcon name="profile" />
            </UiButton>
            <UiButton v-if="args.variant !== 'component-d'" size="default" variant="ghost">
              <UiIcon name="giftBox" />
            </UiButton>
            <UiButton class="hidden lg:block" size="default" variant="ghost">
              <UiIcon name="notificationsOff" />
            </UiButton>
          </div>
          <div v-else :class="['gap-2', args.variant === 'component-a' ? 'hidden lg:flex' : 'flex']">
            <UiButton :variant="args.variant === 'component-c' ? 'tertiary' : 'secondary'">Log in</UiButton>
            <UiButton>Sign up</UiButton>
          </div>
        </div>
      </template>
      <template #chat-content>
        <div class="bg-neutral-400 p-2 w-32 rounded-b-2">chat Content</div>
      </template>
    </UiHeader>`
  })
} satisfies Meta<HeaderPropsAndCustomArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  args: {
    variant: 'simple'
  }
}

export const ComponentAGuest: Story = {
  args: {
    isMobileChatButton: true,
    variant: 'component-a'
  }
}

export const ComponentAUser: Story = {
  args: {
    isLoggedIn: true,
    isMobileChatButton: true,
    variant: 'component-a',
    ui: {
      container: {
        base: 'w-full lg:w-auto'
      }
    }
  }
}

export const ComponentBGuest: Story = {
  args: {
    variant: 'component-b'
  }
}

export const ComponentBUser: Story = {
  args: {
    isLoggedIn: true,
    variant: 'component-b'
  }
}

export const ComponentCGuest: Story = {
  args: {
    variant: 'component-c'
  }
}

export const ComponentCUser: Story = {
  args: {
    isLoggedIn: true,
    variant: 'component-c'
  }
}

export const ComponentDGuest: Story = {
  args: {
    variant: 'component-d'
  }
}

export const ComponentDUser: Story = {
  args: {
    isLoggedIn: true,
    variant: 'component-d'
  }
}
