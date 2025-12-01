import UiSelect from '@src/components/select/UiSelect.vue'
import { emitsObserver } from '@src/stories/utils/decorators'
import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'UI Kit/Select',
  component: UiSelect,
  decorators: [emitsObserver],
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    form: { control: 'text' },
    placeholder: { control: 'text' },
    modelValue: { control: 'text' },
    error: { control: 'text' },
    description: { control: 'text' },
    subLabel: { control: 'text' },
    selectTextAlign: { control: 'select', options: ['left', 'center', 'right'] },
    size: { control: 'select', options: ['small', 'medium'] },
    fullWidth: { control: 'boolean' },
    options: { control: 'object' },
    dataTest: { control: 'text' },
    ui: { control: 'object' },
    offsetValue: { control: 'number' }
  },
  args: {
    label: 'Select an option',
    name: 'select',
    placeholder: 'Choose...',
    disabled: false,
    required: false,
    modelValue: '',
    selectTextAlign: 'left',
    size: 'small',
    fullWidth: false,
    dataTest: 'select-field',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' }
    ],
    offsetValue: 4
  },
  render: (args) => ({
    name: 'Story',
    components: { UiSelect },
    setup: () => {
      const modelValue = ref(args.modelValue)
      return { args, modelValue }
    },
    template: `<UiSelect v-bind="args" v-model="modelValue" />`
  })
} satisfies Meta<typeof UiSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}

export const WithSelectedValue: Story = {
  args: {
    modelValue: '2'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: '1'
  }
}

export const WithError: Story = {
  args: {
    error: 'This field is required'
  }
}

export const WithDescription: Story = {
  args: {
    description: 'Please select one of the available options'
  }
}

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2 (Disabled)', value: '2', disabled: true },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4 (Disabled)', value: '4', disabled: true },
      { label: 'Option 5', value: '5' }
    ]
  }
}

export const ManyOptions: Story = {
  args: {
    label: 'Select a country',
    placeholder: 'Choose a country...',
    options: [
      { label: 'United States', value: 'us' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Canada', value: 'ca' },
      { label: 'Australia', value: 'au' },
      { label: 'Germany', value: 'de' },
      { label: 'France', value: 'fr' },
      { label: 'Italy', value: 'it' },
      { label: 'Spain', value: 'es' },
      { label: 'Netherlands', value: 'nl' },
      { label: 'Belgium', value: 'be' },
      { label: 'Switzerland', value: 'ch' },
      { label: 'Austria', value: 'at' },
      { label: 'Poland', value: 'pl' },
      { label: 'Ukraine', value: 'ua' },
      { label: 'Japan', value: 'jp' },
      { label: 'China', value: 'cn' },
      { label: 'India', value: 'in' },
      { label: 'Brazil', value: 'br' },
      { label: 'Mexico', value: 'mx' },
      { label: 'Argentina', value: 'ar' }
    ]
  }
}

export const WithLeftSlot: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiSelect },
    setup: () => {
      const modelValue = ref(args.modelValue)
      return { args, modelValue }
    },
    template: `<UiSelect v-bind="args" v-model="modelValue">
      <template #left>
        <span class="text-gray-500">🌍</span>
      </template>
    </UiSelect>`
  }),
  args: {
    label: 'Country',
    placeholder: 'Select country...',
    options: [
      { label: 'United States', value: 'us' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Canada', value: 'ca' }
    ]
  }
}

export const SizeMedium: Story = {
  args: {
    size: 'medium',
    label: 'Medium Size Select'
  }
}
