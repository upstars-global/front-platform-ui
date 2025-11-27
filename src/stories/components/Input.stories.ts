import UiInput from '@src/components/input/UiInput.vue'
import { emitsObserver } from '@src/stories/utils/decorators'
import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'UI Kit/Input',
  component: UiInput,
  decorators: [emitsObserver],
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    form: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date', 'time']
    },
    modelValue: { control: 'text' },
    mask: { control: 'text' },
    autocomplete: { control: 'text' },
    autofocus: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    pattern: { control: 'text' },
    step: { control: 'number' },
    maxlength: { control: 'number' },
    error: { control: 'text' },
    description: { control: 'text' },
    subLabel: { control: 'text' },
    inputTextAlign: { control: 'select', options: ['left', 'center', 'right'] },
    recommendations: { control: 'object' },
    dataTest: { control: 'text' },
    ui: { control: 'object' },
    offsetValue: { control: 'number' }
  },
  args: {
    label: 'Label',
    name: 'input',
    placeholder: 'Enter text...',
    type: 'text',
    disabled: false,
    required: false,
    autofocus: false,
    modelValue: '',
    inputTextAlign: 'left',
    dataTest: 'text-field',
    recommendations: [],
    offsetValue: 4,
    ui: {
      input: {
        base: 'bg-slate-100 autofill:bg-slate-50 focus:border-sky-500 border-slate-300 placeholder:text-slate-400',
        invalid: '!border-red-500'
      },
      recommendationsContainer: 'border-sky-500 bg-slate-50',
      recommendationsListItem: 'border-slate-300 hover:bg-slate-100',
      error: {
        content: 'bg-red-500',
        text: 'text-white'
      }
    }
  },
  render: (args) => ({
    name: 'Story',
    components: { UiInput },
    setup: () => ({ args }),
    template: `<UiInput v-bind="args" />`
  })
} satisfies Meta<typeof UiInput>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: 'Disabled'
  }
}

export const WithError: Story = {
  args: {
    error: 'This field is required'
  }
}

export const WithDescription: Story = {
  args: {
    description: 'This is a helpful description text'
  }
}

export const WithRecommendations: Story = {
  args: {
    recommendations: ['john.doe@example.com', 'jane.smith@example.com', 'admin@company.com'],
    placeholder: 'Type to see recommendations...'
  }
}

export const PasswordInput: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    autocomplete: 'current-password'
  }
}

export const EmailInput: Story = {
  args: {
    type: 'email',
    label: 'Email',
    placeholder: 'your@email.com',
    autocomplete: 'email'
  }
}

export const WithLeftSlot: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiInput },
    setup: () => ({ args }),
    template: `<UiInput v-bind="args">
      <template #left>
        <span class="text-gray-500">$</span>
      </template>
    </UiInput>`
  }),
  args: {
    label: 'Price',
    placeholder: '0.00',
    type: 'number'
  }
}

export const WithRightSlot: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiInput },
    setup: () => ({ args }),
    template: `<UiInput v-bind="args">
      <template #right>
        <span class="text-gray-500">$</span>
      </template>
    </UiInput>`
  }),
  args: {
    label: 'Amount',
    placeholder: '0.00',
    type: 'number'
  }
}

export const PhoneMask: Story = {
  render: (args) => ({
    components: { UiInput },
    setup() {
      const modelValue = ref(args.modelValue || '')
      return { args, modelValue }
    },
    template: `
      <UiInput 
        v-bind="args" 
        v-model="modelValue"
      />
    `
  }),
  args: {
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567',
    mask: '+1 (###) ###-####',
    type: 'tel'
  }
}

export const CardMask: Story = {
  render: (args) => ({
    components: { UiInput },
    setup() {
      const modelValue = ref(args.modelValue || '')
      return { args, modelValue }
    },
    template: `
      <UiInput 
        v-bind="args" 
        v-model="modelValue"
      />
    `
  }),
  args: {
    label: 'Credit Card',
    placeholder: '1234 5678 9012 3456',
    mask: '#### #### #### ####'
  }
}

export const DateMask: Story = {
  render: (args) => ({
    components: { UiInput },
    setup() {
      const modelValue = ref(args.modelValue || '')
      return { args, modelValue }
    },
    template: `
      <UiInput 
        v-bind="args" 
        v-model="modelValue"
      />
    `
  }),
  args: {
    label: 'Date',
    placeholder: 'DD/MM/YYYY',
    mask: '##/##/####'
  }
}
