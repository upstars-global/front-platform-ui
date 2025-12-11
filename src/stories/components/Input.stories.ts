import UiInput from '@src/components/input/UiInput.vue'
import { argsUpdater, emitsObserver } from '@src/stories/utils/decorators'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'

const meta = {
  title: 'UI Kit/Input',
  component: UiInput,
  decorators: [emitsObserver, argsUpdater],
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
    offsetValue: 4
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
    recommendations: ['@gmail.com', '@yahoo.com', '@hotmail.com'],
    placeholder: 'Type to see recommendations...'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiInput },
    setup: () => {
      const modelValue = ref(args.modelValue || '')

      const filteredRecommendations = computed(() => {
        if (!modelValue.value) return []

        const value = getValueWithoutDomain(modelValue.value)

        return (args?.recommendations?.map((recommendation: string) => `${value}${recommendation}`) || []).filter(
          (value: string) => value.includes(modelValue.value)
        )
      })

      const getValueWithoutDomain = (value: string) => {
        if (!value) return ''

        return value.split('@')[0]
      }

      return { args, modelValue, filteredRecommendations }
    },
    template: `<UiInput 
      v-bind="args" 
      v-model="modelValue" 
      :recommendations="filteredRecommendations"
    />`
  })
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
  },
  argTypes: {
    modelValue: { control: 'number' }
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
  },
  argTypes: {
    modelValue: { control: 'number' }
  }
}

export const PhoneMask: Story = {
  args: {
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567',
    mask: '+1 (###) ###-####',
    type: 'tel'
  },
  argTypes: {
    modelValue: { control: false }
  }
}

export const CardMask: Story = {
  args: {
    label: 'Credit Card',
    placeholder: '1234 5678 9012 3456',
    mask: '#### #### #### ####'
  },
  argTypes: {
    modelValue: { control: false }
  }
}

export const DateMask: Story = {
  args: {
    label: 'Date',
    placeholder: 'DD/MM/YYYY',
    mask: '##/##/####'
  },
  argTypes: {
    modelValue: { control: false }
  }
}
