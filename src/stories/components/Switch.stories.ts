import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, watch } from 'vue'
import { emitsObserver } from '@src/stories/utils/decorators'
import UiSwitch from '@src/components/switch/UiSwitch.vue'

const meta = {
  title: 'UI Kit/Switch',
  component: UiSwitch,
  tags: ['autodocs'],
  decorators: [emitsObserver],
  argTypes: {
    modelValue: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    ui: { control: 'object' }
  },
  args: {
    modelValue: false,
    size: 'md'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiSwitch },
    setup: () => {
      const model = ref(args.modelValue)
      watch(
        () => args.modelValue,
        (value) => (model.value = value)
      )
      return { args, model }
    },
    template: `<UiSwitch v-bind="args" v-model="model" />`
  })
} satisfies Meta<typeof UiSwitch>

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

export const VariousSizes: Story = {
  argTypes: {
    size: { table: { disable: true } }
  },
  render: (args) => ({
    name: 'Story',
    components: { UiSwitch },
    setup: () => ({ args, sizes: ['sm', 'md', 'lg'] }),
    template: `<div class="flex gap-4">
      <template v-for="size in sizes" :key="size">
        <div class="flex flex-col gap-4 text-center">
          <span class="text-xs text-neutral-700">{{ size }}</span>
          <UiSwitch v-bind="args" :size="size" />
        </div>
      </template>
    </div>`
  })
}
