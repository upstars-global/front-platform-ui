import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { emitsObserver, vueRouter } from '@src/stories/utils/decorators'
import { UiBottomBar } from '@src/components'
import { BOTTOM_BAR_NAVIGATION } from '../config/bottomBar'

const meta = {
  title: 'UI Kit/BottomBar',
  component: UiBottomBar,
  tags: ['autodocs'],
  decorators: [emitsObserver, vueRouter()],
  argTypes: {
    labels: { control: 'object' },
    isLoggedIn: { control: 'boolean' },
    isLockAuthButtons: { control: 'boolean' },
    variant: { control: 'select', options: ['component-a', 'component-b', 'component-c', 'component-d'] },
    notificationCounter: { control: 'number' },
    ui: { control: 'object' }
  },
  args: {
    labels: {
      signIn: 'Login',
      signUp: 'Sign Up',
      cashbox: 'Deposit',
      sidebar: 'More'
    },
    navigation: BOTTOM_BAR_NAVIGATION,
    notificationCounter: 3
  },
  render: (args) => ({
    name: 'Story',
    components: { UiBottomBar },
    setup: () => ({ args }),
    template: `<UiBottomBar v-bind="args" class="max-w-sm mx-auto" />`
  })
} satisfies Meta<typeof UiBottomBar>

export default meta
type Story = StoryObj<typeof meta>

export const ComponentAGuest: Story = {
  args: {
    variant: 'component-a'
  }
}

export const ComponentAUser: Story = {
  args: {
    isLoggedIn: true,
    variant: 'component-a'
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
