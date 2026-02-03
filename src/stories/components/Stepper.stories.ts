import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiStepper from '@src/components/stepper/UiStepper.vue'

const meta = {
  title: 'UI Kit/Stepper',
  component: UiStepper,
  tags: ['autodocs'],
  argTypes: {
    currentStep: { control: 'number' },
    size: { control: 'number' },
    ui: { control: 'object' }
  },
  args: {
    currentStep: 1,
    size: 4
  },
  render: (args) => ({
    name: 'Story',
    components: { UiStepper },
    setup: () => ({ args }),
    template: `<UiStepper v-bind="args" />`
  })
} satisfies Meta<typeof UiStepper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
