import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { emitsObserver } from '@src/stories/utils/decorators'
import StoryPlaceholder from '@src/stories/utils/components/StoryPlaceholder.vue'
import UiCard from '@src/components/card/UiCard.vue'

const orientationOptions = ['horizontal', 'vertical']
const variantOptions = ['default', 'outline', 'soft', 'subtle']

const meta = {
  title: 'UI Kit/Card',
  component: UiCard,
  tags: ['autodocs'],
  decorators: [emitsObserver],
  argTypes: {
    as: { control: 'text' },
    isRounded: { control: 'boolean' },
    orientation: { control: 'select', options: orientationOptions },
    variant: { control: 'select', options: variantOptions },
    ui: { control: 'object' }
  },
  args: {
    as: 'div',
    isRounded: true,
    orientation: 'vertical'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiCard, StoryPlaceholder },
    setup: () => ({ args }),
    template: `<UiCard v-bind="args">
      <StoryPlaceholder class="h-48" />
      <StoryPlaceholder v-if="args.orientation === 'horizontal'" class="h-48" />
    </UiCard>`
  })
} satisfies Meta<typeof UiCard>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal'
  }
}

export const Outline: Story = {
  args: {
    variant: 'outline'
  }
}

export const Soft: Story = {
  args: {
    variant: 'soft'
  }
}

export const Subtle: Story = {
  args: {
    variant: 'subtle'
  }
}
