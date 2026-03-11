import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiBanner from '@src/components/banner/UiBanner.vue'

const meta = {
  title: 'UI Kit/Banner',
  component: UiBanner,
  tags: ['autodocs'],
  argTypes: {
    ui: { control: 'object' }
  },
  render: (args) => ({
    name: 'Story',
    components: { UiBanner },
    setup: () => ({ args }),
    template: `<UiBanner v-bind="args" />`
  })
} satisfies Meta<typeof UiBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}
