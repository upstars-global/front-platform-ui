import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { emitsObserver } from '@src/stories/utils/decorators'
import UiCheckbox from '@src/components/checkbox/UiCheckbox.vue'
import { icons } from '@src/components/icon/config'
import { CHECKBOX_SIZE_LIST } from '../config/checkbox'
import type { UiIconName } from '@src/components'

const iconNames = Object.keys(icons).sort((a, b) => a.localeCompare(b)) as UiIconName[]

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
    checkboxSize: { control: 'select', options: CHECKBOX_SIZE_LIST },
    icon: { control: 'select', options: iconNames },
    error: { control: 'text' },
    errorIcon: { control: 'select', options: iconNames },
    ui: { control: 'object' }
  },
  args: {
    label: 'Checkbox label',
    name: 'checkbox',
    icon: 'check',
    disabled: false,
    required: false,
    modelValue: false,
    checkboxSize: '24'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiCheckbox },
    setup: () => ({ args }),
    template: `<UiCheckbox v-bind="args" />`
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

export const Error: Story = {
  args: {
    error: 'Need to be checked',
    errorIcon: 'exclamationTriangle'
  }
}

export const CustomLabelSlot: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiCheckbox },
    setup: () => ({ args }),
    template: `<UiCheckbox v-bind="args">
      <span>Custom label via slot</span>
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
    template: `<UiCheckbox v-bind="args">
    <template #error-message>
      <span>Custom error message via slot</span>
    </template>
  </UiCheckbox>`
  })
}
