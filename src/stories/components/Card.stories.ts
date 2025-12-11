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
    isReverse: { control: 'boolean' },
    orientation: { control: 'select', options: orientationOptions },
    variant: { control: 'select', options: variantOptions },
    ui: { control: 'object' }
  },
  args: {
    as: 'div',
    isRounded: true,
    isReverse: false,
    orientation: 'vertical'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiCard, StoryPlaceholder },
    setup: () => ({ args }),
    template: `<UiCard v-bind="args">
      <template #header>
        <StoryPlaceholder class="h-8">header slot</StoryPlaceholder>
      </template>
      <template #body>
        <StoryPlaceholder class="h-24">body slot</StoryPlaceholder>
      </template>
      <template #footer>
        <StoryPlaceholder class="h-8">footer slot</StoryPlaceholder>
      </template>
      <StoryPlaceholder class="h-48">default slot</StoryPlaceholder>
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

export const HorizontalReverse: Story = {
  args: {
    isReverse: true,
    orientation: 'horizontal'
  }
}

export const VerticalReverse: Story = {
  args: {
    isReverse: true
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
