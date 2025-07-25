import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { emitsObserver } from '@src/stories/utils/decorators.ts'
import UiCheckbox from '@src/components/checkbox/UiCheckbox.vue'

const meta = {
  title: 'UI Kit/Checkbox',
  component: UiCheckbox,
  decorators: [emitsObserver],
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    form: { control: 'text' },
    icon: { control: 'text' },
    error: { control: 'text' },
    requiredMessage: { control: 'text' }
  },
  args: {
    label: 'Checkbox label',
    name: 'checkbox',
    disabled: false,
    required: false,
    modelValue: false
  },
  render: (args) => ({
    name: 'Story',
    components: { UiCheckbox },
    setup: () => ({ args }),
    template: `<UiCheckbox v-bind="args" v-on="$attrs.listeners" />`
  })
} satisfies Meta<typeof UiCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}

export const Checked: Story = {
  args: {
    modelValue: true
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const Required: Story = {
  args: {
    required: true,
    requiredMessage: 'This field is required'
  }
}

export const Error: Story = {
  args: {
    error: 'Need to be checked'
  }
}

export const CustomLabelSlot: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiCheckbox },
    setup: () => ({ args }),
    template: `<UiCheckbox v-bind="args" v-on="$attrs.listeners">
    <template #label>
      <span>Custom label via slot</span>
    </template>
  </UiCheckbox>`
  })
}

export const CustomErrorSlot: Story = {
  args: {
    error: 'error'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiCheckbox },
    setup: () => ({ args }),
    template: `<UiCheckbox v-bind="args" v-on="$attrs.listeners">
    <template #error-message>
      <span style="color: tomato; font-size: 10px;">Custom error message via slot</span>
    </template>
  </UiCheckbox>`
  })
}
