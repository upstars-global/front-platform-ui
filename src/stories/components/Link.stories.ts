import type { ComponentProps } from 'vue-component-type-helpers'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiLink from '@src/components/link/UiLink.vue'
import { emitsObserver, vueRouter } from '@src/stories/utils/decorators'
import { action } from 'storybook/actions'

type LinkPropsAndCustomArgs = ComponentProps<typeof UiLink> & { target?: string; text?: string }

const meta = {
  title: 'UI Kit/Link',
  component: UiLink,
  tags: ['autodocs'],
  decorators: [emitsObserver, vueRouter()],
  argTypes: {
    to: { control: 'text' },
    activeClass: { control: 'text' },
    exactActiveClass: { control: 'text' },
    variant: { control: 'select', options: ['default', 'primary'] },
    ui: { control: 'object' },
    target: { control: 'select', options: ['_self', '_blank', '_parent', '_top', undefined] },
    text: { control: 'text' }
  },
  args: {
    text: 'This is a UI link'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiLink },
    setup: () => {
      const handleClick = (event: MouseEvent) => {
        // prevent all clicks on the link
        event.preventDefault()
        action('href')(args.to)
      }
      return { args, handleClick }
    },
    template: `<UiLink v-bind="args" @click="handleClick">{{ args.text }}</UiLink>`
  })
} satisfies Meta<LinkPropsAndCustomArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Unstyled: Story = {
  args: {
    to: '#',
    variant: 'default',
    text: 'This is an default link'
  }
}

export const Primary: Story = {
  args: {
    to: '#',
    variant: 'primary',
    text: 'This is a primary link'
  }
}

export const RouterLink: Story = {
  args: {
    to: '/',
    variant: 'primary',
    activeClass: 'text-violet-500 hover:text-violet-600',
    text: 'This is a router link'
  }
}

export const ExternalLink: Story = {
  args: {
    to: 'https://storybook.js.org/',
    variant: 'primary',
    text: 'This is a external link'
  }
}
