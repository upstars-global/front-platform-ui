import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import UiBadge from '@src/components/badge/UiBadge.vue'
import { emitsObserver } from '@src/stories/utils/decorators'

type BadgePropsAndCustomArgs = ComponentProps<typeof UiBadge> & { background?: string; text?: string }

const variantOptions = ['default', 'cropped', 'counter']
const sizeOptions = ['sm', 'md', 'default']

const meta = {
  title: 'UI Kit/Badge',
  component: UiBadge,
  tags: ['autodocs'],
  decorators: [emitsObserver],
  argTypes: {
    background: { control: 'color' },
    size: { control: 'select', options: sizeOptions },
    variant: { control: 'select', options: variantOptions },
    text: { control: 'text' },
    ui: { control: 'object' }
  },
  render: (args) => ({
    name: 'Story',
    components: { UiBadge },
    setup: () => ({ args }),
    template: `<UiBadge v-bind="args" :style="{ backgroundColor: args.background }">{{ args.text }}</UiBadge>`
  })
} satisfies Meta<BadgePropsAndCustomArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    background: '#F65757',
    size: 'md',
    variant: 'default',
    text: 'Badge'
  }
}

export const Cropped: Story = {
  args: {
    background: '#F65757',
    size: 'md',
    variant: 'cropped',
    text: 'Badge'
  }
}

export const Rounded: Story = {
  args: {
    background: '#F65757',
    size: 'default',
    variant: 'counter',
    text: '12',
    ui: {
      strategy: 'merge',
      size: { default: 'w-6 h-6 text-xs' }
    }
  }
}
