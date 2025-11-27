import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import UiBadge from '@src/components/badge/UiBadge.vue'
import { emitsObserver } from '@src/stories/utils/decorators'
import { icons, type UiIconName } from '@src/components/icon/config'
import { ICON_SIZE_LIST } from '../config/icons'

type BadgePropsAndCustomArgs = ComponentProps<typeof UiBadge> & { background?: string; text?: string }

const variantOptions = ['default', 'cropped', 'counter']
const sizeOptions = ['sm', 'md', 'default']

const iconNames = Object.keys(icons).sort((a, b) => a.localeCompare(b)) as UiIconName[]

const meta = {
  title: 'UI Kit/Badge',
  component: UiBadge,
  tags: ['autodocs'],
  decorators: [emitsObserver],
  argTypes: {
    background: { control: 'color' },
    size: { control: 'select', options: sizeOptions },
    variant: { control: 'select', options: variantOptions },
    leadingIconName: { control: 'select', options: iconNames },
    leadingIconSize: { control: 'select', options: ICON_SIZE_LIST },
    trailingIconName: { control: 'select', options: iconNames },
    trailingIconSize: { control: 'select', options: ICON_SIZE_LIST },
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

export const LeadingIcon: Story = {
  args: {
    background: '#F65757',
    size: 'md',
    variant: 'default',
    leadingIconName: 'info3',
    text: 'Badge'
  }
}

export const TrailingIcon: Story = {
  args: {
    background: '#F65757',
    size: 'md',
    variant: 'cropped',
    trailingIconName: 'faq',
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
