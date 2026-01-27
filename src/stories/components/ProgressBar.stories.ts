import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiProgressBar from '@src/components/progress-bar/UiProgressBar.vue'

const meta = {
  title: 'UI Kit/ProgressBar',
  component: UiProgressBar,
  tags: ['autodocs'],
  argTypes: {
    progress: { control: 'number' },
    max: { control: 'number' },
    min: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md'] },
    ui: { control: 'object' }
  },
  args: {
    progress: 67,
    size: 'sm'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiProgressBar },
    setup: () => ({ args }),
    template: `<UiProgressBar v-bind="args" class="max-w-60" />`
  })
} satisfies Meta<typeof UiProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}

export const Slots: Story = {
  args: {
    max: 100,
    size: 'md'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiProgressBar },
    setup: () => ({ args }),
    template: `<UiProgressBar v-bind="args" class="max-w-60">
      <template #top>
        <span class="text-xs">top slot</span>
      </template>
      <template #inside>
        <span>Progress: {{ args.progress }} / {{ args.max }}</span>
      </template>
      <span class="text-xs">default slot</span>
    </UiProgressBar>`
  })
}

export const VariousSizes: Story = {
  argTypes: {
    size: { table: { disable: true } }
  },
  render: (args) => ({
    name: 'Story',
    components: { UiProgressBar },
    setup: () => ({ args, sizes: ['sm', 'md'] }),
    template: `<div class="flex flex-col gap-4">
      <template v-for="size in sizes" :key="size">
        <div class="flex gap-4 items-center">
          <span class="text-xs text-neutral-700 w-5">{{ size }}</span>
          <UiProgressBar v-bind="args" :size="size" class="max-w-60" />
        </div>
      </template>
    </div>`
  })
}
