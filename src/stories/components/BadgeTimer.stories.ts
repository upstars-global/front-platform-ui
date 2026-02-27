import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { emitsObserver } from '@src/stories/utils/decorators'
import UiBadge from '@src/components/badge-timer/UiBadgeTimer.vue'

const variantOptions = ['default', 'outline', 'soft']
const sizeOptions = ['sm', 'md']

const meta = {
  title: 'UI Kit/BadgeTimer',
  component: UiBadge,
  tags: ['autodocs'],
  decorators: [emitsObserver],
  argTypes: {
    size: { control: 'select', options: sizeOptions },
    variant: { control: 'select', options: variantOptions },
    indicatorType: { control: 'select', options: ['success', 'error', 'warning', 'info'] },
    showIndicator: { control: 'boolean' },
    label: { control: 'text' },
    timer: { control: 'object' },
    ui: { control: 'object' }
  },
  args: {
    label: 'Starts in:',
    size: 'md',
    variant: 'default',
    indicatorType: 'info',
    showIndicator: false,
    isCropped: false,
    timer: {
      labels: { days: 'd', hours: '', minutes: '', seconds: '' },
      deadline: new Date('2027-01-01T00:00:00.000Z')
    }
  },
  render: (args) => ({
    name: 'Story',
    components: { UiBadge },
    setup: () => ({ args }),
    template: `<UiBadge v-bind="args" />`
  })
} satisfies Meta<typeof UiBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}

export const WithIndicator: Story = {
  args: {
    indicatorType: 'success',
    showIndicator: true
  }
}

export const Soft: Story = {
  args: {
    variant: 'soft',
    indicatorType: 'error',
    showIndicator: true
  }
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    indicatorType: 'success',
    showIndicator: true
  }
}

export const SoftCropped: Story = {
  args: {
    variant: 'soft',
    indicatorType: 'warning',
    showIndicator: true,
    isCropped: true
  }
}

export const OutlineCropped: Story = {
  args: {
    variant: 'outline',
    indicatorType: 'warning',
    showIndicator: true,
    isCropped: true
  }
}
