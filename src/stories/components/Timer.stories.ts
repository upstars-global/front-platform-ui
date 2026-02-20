import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { emitsObserver } from '@src/stories/utils/decorators'
import UiTimer from '@src/components/timer/UiTimer.vue'

const meta = {
  title: 'UI Kit/Timer',
  component: UiTimer,
  tags: ['autodocs'],
  decorators: [emitsObserver],
  argTypes: {
    deadline: { control: 'date' },
    labels: { control: 'object' },
    showDots: { control: 'boolean' },
    ui: { control: 'object' }
  },
  args: {
    labels: { days: 'd', hours: '', minutes: '', seconds: '' },
    showDots: true,
    deadline: new Date('2027-01-01T00:00:00.000Z')
  },
  render: (args) => ({
    name: 'Story',
    components: { UiTimer },
    setup: () => ({ args }),
    template: `<UiTimer v-bind="args" />`
  })
} satisfies Meta<typeof UiTimer>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}

export const WithLeadingSlot: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiTimer },
    setup: () => ({ args }),
    template: `<UiTimer v-bind="args">
      <template #leading>
        <span class="mr-2">Starts in</span>
      </template>
    </UiTimer>`
  })
}

export const WithTrailingSlot: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiTimer },
    setup: () => ({ args }),
    template: `<UiTimer v-bind="args">
      <template #trailing>
        <span class="ml-2">till the end</span>
      </template>
    </UiTimer>`
  })
}
