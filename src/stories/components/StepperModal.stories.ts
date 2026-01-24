import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiStepperModal from '@src/components/stepper-modal/UiStepperModal.vue'
import UiButton from '@src/components/button/UiButton.vue'
import { emitsObserver } from '@src/stories/utils/decorators'

const meta = {
  title: 'UI Kit/StepperModal',
  component: UiStepperModal,
  tags: ['autodocs'],
  decorators: [
    emitsObserver,
    () => ({
      template: "<div class='fixed inset-0 flex items-end md:items-center justify-center bg-black/50'><story/></div>"
    })
  ],
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    showCloseButton: { control: 'boolean' },
    fullscreen: { control: 'boolean' },
    currentStep: { control: 'number' },
    totalSteps: { control: 'number' },
    hideProgress: { control: 'boolean' },
    hideBackButton: { control: 'boolean' },
    role: { control: 'select', options: ['dialog', 'alertdialog'] },
    ui: { control: 'object' }
  },
  args: {
    title: 'Modal Title',
    description: 'Next step: ...',
    currentStep: 2,
    totalSteps: 4,
    role: 'dialog'
  }
} satisfies Meta<typeof UiStepperModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiStepperModal, UiButton },
    setup: () => ({ args }),
    template: `
      <UiStepperModal v-bind="args">
        <p class="text-slate-700">This is the modal content for step {{ args.currentStep }}.</p>
      </UiStepperModal>
    `
  })
}

export const HiddenProgress: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiStepperModal, UiButton },
    setup: () => ({ args }),
    template: `
      <UiStepperModal v-bind="args">
        <p class="text-slate-700">Modal without progress stepper. Only title and description are shown.</p>
      </UiStepperModal>
    `
  }),
  args: {
    title: 'Settings',
    description: 'Configure your preferences',
    hideProgress: true
  }
}
